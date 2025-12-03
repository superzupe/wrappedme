import { getToken } from "next-auth/jwt";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(req) {
  const token = await getToken({ req });
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token?.accesToken);

  const data = await spotifyApi.getMyTopTracks({ limit: 5, time_range: "long_term" });
  const tracks = data.body.items.map((track) => ({
    id: track.id,
    title: track.name,
    thumbnail: track.album.images[0]?.url,
    artist: track.artists.map((a) => a.name).join(", "),
  }));

  return new Response(JSON.stringify({ items: tracks }), {
    headers: { "Content-Type": "application/json" },
  });
}
