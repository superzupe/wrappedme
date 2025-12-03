import { getToken } from "next-auth/jwt";
import SpotifyWebApi from "spotify-web-api-node";

export async function GET(req) {
  try {
    const token = await getToken({ req });
    if (!token?.accessToken) {
      return new Response("Unauthorized", { status: 401 });
    }
  
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token.accessToken);
  
    const me = await spotifyApi.getMe();
  
    const username = me.body.display_name || me.body.id;
  
    return new Response(JSON.stringify({ name: username }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
     console.error("API /user error:", err);
     return new Response("Internal Server Error", { status: 500 });
  }
}
