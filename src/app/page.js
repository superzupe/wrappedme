"use client";
import { useRouter } from "next/navigation";
import ButtonAuth from "@/components/ButtonAuth";

const Home = () => {
  const router = useRouter();

  const goLogin = () => {
    router.push("/login");
  };

  return (
    <main className="bg-galaxy-main flex flex-col min-h-screen justify-center items-center gap-6">
      <h1 className="font-black text-4xl text-center">
        Grab your <span className="text-indigo-500">Spotify Wrapped</span> early
        <br /> and dive into your year in{" "}
        <span className="text-purple-400">music</span>.
      </h1>
     <ButtonAuth onClick={goLogin} label="Login to Spotify"/>
    </main>
  );
};

export default Home;
