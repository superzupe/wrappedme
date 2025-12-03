import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
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
        params: {
          scope: "user-top-read user-read-recently-played",
        },
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account }) {
      // ⬇️ Saat user klik “Connect Spotify”
      if (account?.provider === "spotify") {
        token.spotifyAccessToken = account.access_token;
        token.spotifyRefreshToken = account.refresh_token;
      }

      // ⬇️ Saat login Google/Facebook — jangan hapus token Spotify yang lama
      return token;
    },

    async session({ session, token }) {
      session.spotifyAccessToken = token.spotifyAccessToken ?? null;
      session.spotifyRefreshToken = token.spotifyRefreshToken ?? null;
      return session;
    },

    async redirect() {
      return "/dashboard";
    },
  },
});

export { handler as GET, handler as POST };
