"use client";

export const dynamic = "force-dynamic";

import { useSession, signIn } from "next-auth/react";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter()
  
  //sudah connect lanjut fetch
  useEffect(() => {
    if(status === "authenticated" && session?.spotifyAccessToken) {
      router.push("/results");
    }
  },[status, session, router])

  if (status === "loading")
    return (
      <div className="flex flex-col min-h-screen bg-galaxy-main justify-center items-center">
        <p>Loading...</p>
      </div>
    );

//belum login
if(!session) {
  return router.push("/login")
}

  //jika belum connect
  if (!session.spotifyAccessToken) {
    return (
      <div className="flex flex-col min-h-screen bg-galaxy-main max-w-2xs justify-center items-center">
        <PrimaryButton
          onClick={() => signIn("spotify")}
          label="Connect to Spotify"
        />
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-galaxy-main justify-center items-center">
      <p>Spotify connected! Fetching...</p>
    </div>
  );
};

export default DashboardPage;
