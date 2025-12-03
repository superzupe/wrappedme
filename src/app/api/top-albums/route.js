import { getToken } from "next-auth/jwt";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(red) {
  try {
    const token = await getToken({ req });
    if (!token?.accessToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);

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
    return new Response("Internal Server Error", { status: 500 });
  }
}
