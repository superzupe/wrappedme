"use client";

import { useEffect, useState } from "react";

const InputField = ({ id, type, label, value, onChange }) => {
const [mounted, setMounted] = useState(false)

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setMounted(true);
}, [])

  return (
    <div className="flex flex-col gap-2 justify-start w-full">
      <label
        htmlFor={id}
        className="font-bold text-sm text-text-base"
      >
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={label}
        defaultValue={!mounted ? undefined :value}
        onChange={(e) => onChange(e.target.value)}
        className="outline-none px-5 py-3 text-text-base font-medium border-2 border-border-base rounded-lg
         placeholder:text-text-accent placeholder:font-medium placeholder:text-sm focus:ring-2 focus:ring-border-base"
      />
    </div>
  );
};

export default InputField;
