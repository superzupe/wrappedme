import Image from "next/image";

const TopList = ({ items, title, type = "", titleSrc }) => {
  const isShowName = type === "name";

  return (
    <div className="flex flex-col gap-3 border-2 border-border-base rounded-lg px-12 py-5 md:border-none">
      <header className="flex flex-row gap-2 justify-center">
        <Image
          src={titleSrc}
          alt="Cute Title Icon"
          className="w-9"
        />
        <h2 className="font-bold text-2xl text-text-base">{title}</h2>
      </header>
      <div className="w-full max-w-120 h-px bg-border-base rounded-2xl"></div>
      <ol className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-row justify-start items-center gap-2"
          >
            <span>{index + 1}. </span>
            <Image
              src={item.thumbnail}
              alt={item.artist}
              width={50}
              height={50}
              className="rounded-md"
            />
            <div className="flex flex-col">
              <span className="text-text-base font-bold">{item.title}</span>
              {isShowName && (
                <span className="text-text-accent font-semibold text-sm">
                  {item.artist}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopList;
