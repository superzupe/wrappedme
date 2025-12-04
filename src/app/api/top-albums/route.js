import { getToken } from "next-auth/jwt";
import SpotifyWebApi from "spotify-web-api-node";

// PERBAIKAN UTAMA: Ganti 'red' menjadi 'req' agar getToken bisa bekerja
export async function GET(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.spotifyAccessToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.spotifyAccessToken);

    const data = await spotifyApi.getMyTopTracks({
      limit: 20,
      time_range: "long_term",
    });
    const albumCounts = {};

    data.body.items.forEach((track) => {
      const album = track.album;
      albumCounts[album.id] = albumCounts[album.id] || {
        id: album.id,
        title: album.name,
        // Pastikan images[0] ada sebelum mengakses .url
        thumbnail: album.images[0]?.url,
        artist: album.artists.map((a) => a.name).join(", "),
        count: 0,
      };
      albumCounts[album.id].count++;
    });

    const albums = Object.values(albumCounts).sort((a, b) => b.count - a.count);

    return new Response(JSON.stringify({ items: albums }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API /top-albums error:", err);
    // Tambahkan penanganan error spesifik jika perlu, tapi 500 sudah baik
    return new Response("Internal Server Error", { status: 500 });
  }
}
