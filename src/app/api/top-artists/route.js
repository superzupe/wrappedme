import { getToken } from "next-auth/jwt";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(req) {
  const token = await getToken({ req });
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token?.accessToken);

  const data = await spotifyApi.getMyTopArtists({
    limit: 5,
    time_range: "long_term",
  });
  const artists = data.body.items.map((artist) => ({
    id: artist.id,
    title: artist.name,
    artist: artist.name,
    profileImage: artist.images[0]?.url,
  }));

  return new Response(JSON.stringify({ items: artists }), {
    headers: { "Content-Type": "application/json" },
  });
}
