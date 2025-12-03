import TypingDesc from "@/components/TypingDesc";

const ResultTitle = ({user}) => {
  return (
    <header className="flex flex-col justify-center items-center gap-3 w-full max-w-xs md:max-w-5xl text-center">
      <h1 className="hidden md:block text-text-base font-black text-4xl">
        hi {user}, this is the <span className="text-indigo-500">music</span>{" "}
        journey <br /> you’ve <span className="text-purple-400">lived</span>{" "}
        through this year.
      </h1>
      <h1 className="md:hidden text-text-base font-black text-3xl">
        hi {user}, here’s your <span className="text-indigo-500">year</span> in{" "}
        <span className="text-purple-400">music</span>{" "}
      </h1>
      <TypingDesc />
    </header>
  );
};

export default ResultTitle;
