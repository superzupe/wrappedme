import { getToken } from "next-auth/jwt";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.spotifyAccessToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.spotifyAccessToken);

    const data = await spotifyApi.getMyTopTracks({
      limit: 5,
      time_range: "long_term",
    });
    const tracks = data.body.items.map((track) => ({
      id: track.id,
      title: track.name,
      thumbnail: track.album.images[0]?.url,
      artist: track.artists.map((a) => a.name).join(", "),
    }));

    return new Response(JSON.stringify({ items: tracks }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API /top-tracks error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
