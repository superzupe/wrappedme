const ButtonAuth = ({onClick, label}) => {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 border-2 border-border-base rounded-4xl font-bold text-sm cursor-pointer transition-all duration-300 hover:ring-3 hover:ring-border-base active:bg-bg-accent active:text-text-active active:ring-3 active:ring-bg-accent"
    >
      {label}
    </button>
  );
}

export default ButtonAuth;