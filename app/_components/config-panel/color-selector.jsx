"use client";

import { useEffect, useRef } from "react";
import "@melloware/coloris/dist/coloris.css";
import { X } from "lucide-react";

let Coloris;

export default function ColorSelector({
  label,
  inputValue,
  onChange,
  onDelete,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    import("@melloware/coloris").then((mod) => {
      Coloris = mod.default;
      Coloris.init();

      // Add native event listener to sync with React state
      const inputEl = inputRef.current;
      const handleInput = (e) => {
        // Pass updated value to parent
        onChange({ target: { value: e.target.value } });
      };

      inputEl?.addEventListener("input", handleInput);

      return () => {
        inputEl?.removeEventListener("input", handleInput);
      };
    });
  }, [onChange]);

  return (
    <div className="w-full group flex flex-row justify-between py-5 border-b border-b-gray-800 items-center max-h-[50px]">
      <X
        className="cursor-pointer hidden mr-3 transition-all duration-200 group-hover:block bg-red-800/20 hover:bg-red-800/60 border border-red-500 text-red-500 rounded p-[4px] "
        size={25}
        onClick={onDelete}
      />
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-purple-400 font-bold">{label}</p>
        <div className="flex flex-row items-center   ">
          <input
            ref={inputRef}
            type="text"
            data-coloris
            className="coloris"
            defaultValue={inputValue}
          />
          <div className={`w-[20px] h-[20px] bg-[${inputValue}]`}></div>
        </div>
      </div>
    </div>
  );
}
