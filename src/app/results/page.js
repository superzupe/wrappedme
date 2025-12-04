"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { track, artist, playlist } from "@/assets";
import ResultTitle from "@/components/ResultTitle";
import TopList from "@/components/TopList";
import Minutes from "@/components/MInutes";
import ButtonAuth from "@/components/ButtonAuth";

const ResultsPage = () => {
  // ambil session dari NextAuth
  const { data: session, status } = useSession();

  // state untuk data Wrapped
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [minutes, setMinutes] = useState(0);

  // helper fetch aman, kirim cookie session
  const safeFetch = async (url) => {
    const res = await fetch(url, { credentials: "include" });
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return res.json();
  };

  // fetch data Wrapped setelah login & token tersedia
  useEffect(() => {
    if (status !== "authenticated") return;
    if (!session?.spotifyAccessToken) return;

    Promise.all([
      safeFetch("/api/user"),
      safeFetch("/api/top-tracks"),
      safeFetch("/api/top-artists"),
      safeFetch("/api/top-albums"),
      safeFetch("/api/minutes"),
    ])
      .then(([userData, tracksData, artistsData, albumsData, minutesData]) => {
        setUser(userData.name);
        setTracks(tracksData.items || []);
        setArtists(artistsData.items || []);
        setAlbums(albumsData.items || []);
        setMinutes(minutesData.totalMinutes || 0);
      })
      .catch((err) => console.error("Error fetching Wrapped data:", err));
  }, [status, session]);

  // fallback saat session belum ready
  if (status === "loading") {
    return (
      <div className="flex flex-col min-h-screen bg-galaxy-results justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  // user belum login
  if (!session) {
    return (
      <div className="flex flex-col min-h-screen bg-galaxy-results justify-center items-center">
        <p>You must log in first.</p>
      </div>
    );
  }

  return (
    <main className="bg-galaxy-results min-h-screen flex flex-col justify-center items-center py-16 gap-10 w-full">
      {/* header */}
      <ResultTitle user={user} />

      {/* top lists */}
      <div className="flex flex-col gap-9 justify-center md:flex-row md:justify-between items-center w-full max-w-2xl md:max-w-5xl">
        <TopList
          items={tracks}
          title="Top Tracks"
          type="name"
          titleSrc={track}
        />
        <TopList
          items={artists}
          title="Top Artists"
          titleSrc={artist}
        />
        <TopList
          items={albums}
          title="Top Album"
          type="name"
          titleSrc={playlist}
        />
      </div>

      {/* total minutes */}
      <Minutes minutes={minutes} />

      {/* log out button */}
      <ButtonAuth
        onClick={() => signOut({ callbackUrl: "/" })}
        label="Log out"
      />
    </main>
  );
};

export default ResultsPage;
