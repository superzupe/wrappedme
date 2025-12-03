import { getToken } from "next-auth/jwt";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(req) {
  const token = await getToken({ req });
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token?.setAccessToken);

  const me = await spotifyApi.getMe();

  const username = me.body.display_name || me.body.id;

  return new Response(JSON.stringify({ name: username }), {
    headers: { "Content-Type": "application/json" },
  });
}
