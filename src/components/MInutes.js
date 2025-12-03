"use client"

import Image from "next/image";
import { music1 } from "@/assets";

const Minutes = ({minutes}) => {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-1 w-full max-w-xs md:max-w-lg px-10 py-4 border-2 border-border-base rounded-lg">
      <div className="flex flex-row items-center gap-0.5 ">
        <Image
          src={music1}
          alt="icon music penyemangat hati"
          className="w-7 h-7"
        />
        <h3 className="font-extrabold text-text-accent text-xl">
          You’ve already spent
        </h3>
      </div>

      <p className="font-black text-text-base text-3xl">{minutes}</p>
      <p className="flex flex-row text-center gap-1 text-text-accent font-semibold">
        minutes in your music—let’s take this even further
      </p>
    </div>
  );
};

export default Minutes;