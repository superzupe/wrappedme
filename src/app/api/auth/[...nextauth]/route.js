import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Helper function untuk merefresh token Spotify yang kedaluwarsa
async function refreshAccessToken(token) {
  try {
    // Spotify endpoint untuk merefresh token
    const response = await fetch("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Menggunakan Buffer untuk meng-encode Client ID dan Secret
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.spotifyRefreshToken,
      }),
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    // Mengembalikan token yang diperbarui
    return {
      ...token,
      spotifyAccessToken: refreshedTokens.access_token,
      // Jika Spotify memberikan refresh token baru, gunakan itu, jika tidak, pakai yang lama
      spotifyRefreshToken:
        refreshedTokens.refresh_token ?? token.spotifyRefreshToken,
      // Hitung waktu kedaluwarsa token baru
      spotifyAccessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
    };
  } catch (error) {
    console.error("Error refreshing Spotify access token", error);
    // Mengembalikan token lama, tetapi tambahkan error status
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: { scope: "user-top-read user-read-recently-played" },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // 1. Initial Sign In (saat login pertama)
      if (account?.provider === "spotify" && account.access_token) {
        return {
          ...token,
          spotifyAccessToken: account.access_token,
          spotifyRefreshToken: account.refresh_token,
          // Hitung waktu kedaluwarsa dalam milidetik
          spotifyAccessTokenExpires: account.expires_at * 1000,
        };
      }

      // Pastikan token Spotify ada untuk diproses
      if (!token.spotifyAccessToken) {
        return token;
      }

      // 2. Token Belum Kedaluwarsa
      // Jika waktu sekarang kurang dari waktu kedaluwarsa, kembalikan token lama
      if (Date.now() < token.spotifyAccessTokenExpires) {
        return token;
      }

      // 3. Token Sudah Kedaluwarsa, Lakukan Refresh
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.spotifyAccessToken = token.spotifyAccessToken ?? null;
      session.spotifyRefreshToken = token.spotifyRefreshToken ?? null;
      session.error = token.error; // Tambahkan error status ke sesi
      return session;
    },
    async redirect() {
      return "/dashboard";
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
