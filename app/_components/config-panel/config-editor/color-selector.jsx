"use client";

import { useEffect, useRef } from "react";
import "@melloware/coloris/dist/coloris.css";
import { Link2, X } from "lucide-react";

let Coloris;

export default function ColorSelector({
  label,
  inputValue,
  setSync,
  onChange,
  onDelete,
  prefix,
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
    <div className="w-full group flex flex-row justify-between  py-10 border-b border-b-white/20 items-center max-h-[50px]">
      <div className="flex flex-col w-full px-4">
        <div className="flex flew-row justify-between pb-2">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-white">{label}</p>
            {prefix !== "name" && prefix !== "msg" && (
              <div className="group/sync relative cursor-pointer">
                <Link2
                  className="group-hover/sync:text-purple-500"
                  size={16}
                  onClick={setSync}
                />
                <p className="group-hover/sync:flex hidden py-1 px-2 bg-secondary rounded-sm absolute -bottom-11 left-1/2 -translate-1/2 text-nowrap border border-white/30">
                  Sync with Viewer
                </p>
              </div>
            )}
          </div>
          <X
            className="h-full group-hover:opacity-100 opacity-0 cursor-pointer transition-all duration-200 text-red-500 "
            size={17}
            onClick={onDelete}
          />
        </div>
        <div className="flex flex-row-reverse  bg-secondary rounded-sm mt-2 py-1 px-2 w-fit">
          <input
            ref={inputRef}
            type="text"
            data-coloris
            className="coloris"
            defaultValue={inputValue}
            style={{ width: 90 }}
          />
        </div>
      </div>
    </div>
  );
}
