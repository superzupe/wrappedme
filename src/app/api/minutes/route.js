import { getToken } from "next-auth/jwt";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(req) {
  const token = await getToken({ req });
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token?.accessToken);

  const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 });

  const totalMinutesSample = data.body.items.reduce(
    (acc, item) => acc + item.track.duration_ms / 1000 / 60,
    0
  );

  const totalMinutes = Math.round(totalMinutesSample * 52);

  return new Response(JSON.stringify({ totalMinutes }), {
    headers: { "Content-Type": "application/json" },
  });
}
