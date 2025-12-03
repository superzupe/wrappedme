"use client";
export const dynamic = "force-dynamic";

import { signIn } from "next-auth/react";
import { iconSpotify, iconGoogle, iconFacebook } from "@/assets";
import { useState } from "react";
import Image from "next/image";
import SocialButton from "@/components/SocialButton";
import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";

const LoginPage = () => {
  const [value, setValue] = useState("");

  return (
    <main className="bg-login flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center min-h-screen md:min-h-auto w-full max-w-xm md:max-w-2xl gap-6 md:gap-10 bg-bg-base pt-20 pb-24 py-16 rounded-xl">
        {/* header */}
        <header className="flex flex-col items-center gap-3">
          <Image
            src={iconSpotify}
            alt="Spotify Logo"
            className="w-12 md:w-15"
          />
          <h1 className="font-black text-3xl md:text-4xl">Log in to Spotify</h1>
        </header>

        {/* social button */}
        <div className="flex flex-col gap-2">
          <SocialButton
            onClick={() => signIn("google")}
            icon={iconGoogle}
            alt="Google Icon"
            label="Continue with Google"
          />
          <SocialButton
            onClick={() => signIn("facebook")}
            icon={iconFacebook}
            alt="Facebook Icon"
            label="Continue with Facebook"
          />
        </div>

        {/* divider */}
        <div className="w-full max-w-85 md:max-w-120 h-px bg-border-base"></div>

        {/* form, redirect ke signIn spotify */}
        <form className="flex flex-col justify-center items-center gap-3 w-full max-w-80 md:max-w-90">
          <InputField
            id="email"
            type="text"
            label="Email or Username"
            value={value}
            onChange={setValue}
          />
          <PrimaryButton
            onClick={() => signIn("spotify")} label="Continue"
          />
        </form>

        {/* sign up link */}
        <p className="font-semibold text-sm text-text-accent">
          Don&apos;t have an account?{" "}
          <a
            href="https://www.spotify.com/signup"
            className="font-bold text-text-base underline"
          >
            Sign up for Spotify
          </a>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
