"use client";
import { useEffect, useState, useRef } from "react";

const TypingDesc = () => {
  const text1 =
    "Let’s explore the tracks that stayed with you—every replay, mood shift, and late-night loop. A year of moments, captured in sound.";
  const text2 = "Tracks that stayed with you, a year captured in sound.";

  const [displayed1, setDisplayed1] = useState("");
  const [displayed2, setDisplayed2] = useState("");

  const indexRef = useRef(0);

  useEffect(() => {
    const maxLength = Math.max(text1.length, text2.length);

    const interval = setInterval(() => {
      const currentIndex = indexRef.current;

      if (currentIndex < text1.length) {
        setDisplayed1((prev) => prev + text1[currentIndex]);
      }
      if (currentIndex < text2.length) {
        setDisplayed2((prev) => prev + text2[currentIndex]);
      }

      indexRef.current = currentIndex + 1;

      if (currentIndex >= maxLength) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);

  }, []);


  return (
    <>
      <p className="hidden md:block text-text-base font-medium">
        {displayed1} <span className="animate-pulse">|</span>
      </p>
      <p className="md:hidden text-text-base font-medium">
        {displayed2} <span className="animate-pulse">|</span>
      </p>
    </>
  );
};

export default TypingDesc;
