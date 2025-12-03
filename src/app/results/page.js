"use client";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { track, artist, playlist } from "@/assets";
import ResultTitle from "@/components/ResultTitle";
import TopList from "@/components/TopList";
import Minutes from "@/components/MInutes";
import ButtonAuth from "@/components/ButtonAuth";

const ResultsPage = () => {
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [minutes, setMinutes] = useState(0);

  const safeFetch = async (url) => {
    const res = await fetch(url, { credentials: "include" }); // pastikan session dikirim
    if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status})`);
    return res.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userName, tracksData, artistsData, albumsData, minutesData] =
          await Promise.all([
            safeFetch("/api/user"),
            safeFetch("/api/top-tracks"),
            safeFetch("/api/top-artists"),
            safeFetch("/api/top-albums"),
            safeFetch("/api/minutes"),
          ]);

        setUser(userName.name || "");
        setTracks(tracksData.items || []);
        setArtists(artistsData.items || []);
        setAlbums(albumsData.items || []);
        setMinutes(minutesData.totalMinutes || 0);
      } catch (err) {
        console.error("Error fetching Wrapped data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-galaxy-results min-h-screen flex flex-col justify-center items-center py-16 gap-10 w-full">
      {/* head */}
      <ResultTitle user={user} />

      {/* top list */}
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

      <Minutes minutes={minutes} />
      <ButtonAuth
        onClick={() => signOut({ callbackUrl: "/" })}
        label="Log out"
      />
    </main>
  );
};

export default ResultsPage;
