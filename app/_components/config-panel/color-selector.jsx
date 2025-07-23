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
    <div className="w-full group flex flex-row justify-between  py-10 border-b border-b-[#383838] items-center max-h-[50px]">
      <div className="flex flex-col w-full">
        <div className="flex flew-row justify-between">
          <p className="text-purple-500 font-bold">{label}</p>
          <X
            className="h-full group-hover:opacity-100 opacity-0 cursor-pointer transition-all duration-200 text-red-500 "
            size={17}
            onClick={onDelete}
          />
        </div>
        <div className="flex flex-row-reverse  bg-[#383838] rounded-sm mt-2 py-1 px-2 w-fit">
          <input
            ref={inputRef}
            type="text"
            data-coloris
            className="coloris"
            defaultValue={inputValue}
            style={{ width: 90 }}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
}
