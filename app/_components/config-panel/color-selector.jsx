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
    <div className="w-full group flex flex-row justify-between py-5 border-b border-b-gray-800 items-center max-h-[50px] pl-3">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-purple-400 font-bold">{label}</p>
        <div className="flex flex-row items-center   ">
          <input
            ref={inputRef}
            type="text"
            data-coloris
            className="coloris"
            defaultValue={inputValue}
            style={{ width: 90 }}
          />
          <div className={`w-[20px] h-[20px] bg-[${inputValue}]`}></div>
        </div>
      </div>
      <X
        className="h-full group-hover:opacity-100 opacity-0 cursor-pointer transition-all duration-200 text-red-500 "
        size={17}
        onClick={onDelete}
      />
    </div>
  );
}
