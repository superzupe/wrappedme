import { getToken } from "next-auth/jwt";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(req) {
  // Pastikan menggunakan 'req'
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.spotifyAccessToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.spotifyAccessToken);

    const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 });

    const totalMinutesSample = data.body.items.reduce(
      (acc, item) => acc + item.track.duration_ms / 1000 / 60,
      0
    );

    const totalMinutes = Math.round(totalMinutesSample * 52);

    return new Response(JSON.stringify({ totalMinutes }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API /minutes error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
