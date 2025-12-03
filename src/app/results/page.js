"use client";
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

  useEffect(() => {
    Promise.all([
      fetch("/api/user").then((res) => res.json()),
      fetch("/api/top-tracks").then((res) => res.json()),
      fetch("/api/top-artists").then((res) => res.json()),
      fetch("/api/top-albums").then((res) => res.json()),
      fetch("/api/minutes").then((res) => res.json()),
    ])
    .then(([userName, tracksData, artistsData, albumsData, minutesData]) => {
      setUser(userName.name || "");
      setTracks(tracksData.items || []);
      setArtists(artistsData.items || []);
      setAlbums(albumsData.items || []);
      setMinutes(minutesData.totalMinutes || 0);
    })
    .catch((err) => console.error("Error fetching Wrapped data:", err))
  }, []);

  return (
    <main className="bg-galaxy-results min-h-screen flex flex-col justify-center items-center py-16 gap-10 w-full">
      {/* head */}
      <ResultTitle user={user}/>

{/* top list */}
      <div className="flex flex-col gap-9 justify-center md:flex-row md:justify-between items-center w-full max-w-2xl md:max-w-5xl">
        <TopList
          data={tracks}
          label="Top Tracks"
          type="name"
          titleSrc={track}
        />
        <TopList
          data={artists}
          label="Top Artists"
          titleSrc={artist}
        />
        <TopList
          data={albums}
          label="Top Album"
          type="name"
          titleSrc={playlist}
        />
      </div>

      <Minutes minutes={minutes}/>
      <ButtonAuth
        // onClick={w}
        label="Log out"
      />
    </main>
  );
};

export default ResultsPage;
