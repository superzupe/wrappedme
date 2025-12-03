import Image from "next/image";

const SocialButton = ({ onClick, icon, alt, label }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center justify-between gap-5 md:gap-7 w-full max-w-xs md:max-w-100 px-10 py-3 border-2 border-border-base rounded-full font-black text-sm md:text-base transition-all duration-300 ease-in-out cursor-pointer hover:ring-3 hover:ring-border-medium active:bg-bg-accent active:border-border-medium active:text-text-active"
    >
      <Image
        src={icon}
        alt={alt}
        width={25}
      />
      <span>{label}</span>
      <span></span>
    </button>
  );
};

export default SocialButton;