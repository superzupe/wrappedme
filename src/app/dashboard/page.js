"use client";

export const dynamic = "force-dynamic";


import { useSession, signIn } from "next-auth/react";
import PrimaryButton from "@/components/PrimaryButton";

const DashboardPage = () => {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="flex flex-col min-h-screen bg-login justify-center items-center">
        <p>Loading...</p>
      </div>
    );

  //jika belum connect
  if (!session.spotifyAccessToken) {
    return (
      <div className="flex flex-col min-h-screen bg-login justify-center items-center">
        <PrimaryButton
          onClick={() => signIn("spotify")}
          label="Connect to Spotify"
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-login justify-center items-center">
      <p>Spotify connected! Fetching...</p>
    </div>
  );
};

export default DashboardPage;
