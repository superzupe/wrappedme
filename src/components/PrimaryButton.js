"use client"

const PrimaryButton = ({ onClick, label }) => {
  return (
    <button
    type="button"
      onClick={onClick}
      className="flex flex-row justify-center w-full px-10 py-3 bg-btn-spotify text-text-active font-black text-md rounded-full transition-all duration-300 ease-in-out cursor-pointer hover:ring-4 hover:ring-btn-spotify"
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
