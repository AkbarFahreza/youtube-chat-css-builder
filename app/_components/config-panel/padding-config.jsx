import React from "react";
import { X } from "lucide-react";

export default function PaddingConfig({
  padding,
  setPadding,
  onDelete,
  label,
}) {
  // fallback default to prevent runtime error
  const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
  const safePadding = padding || defaultPadding;

  const handlePaddingChange = (side, value) => {
    setPadding((prev) => ({
      ...prev,
      [side]: Number(value),
    }));
  };

  const opts = [
    { label: "Top", value: "top" },
    { label: "Right", value: "right" },
    { label: "Bottom", value: "bottom" },
    { label: "Left", value: "left" },
  ];

  return (
    <div className="pt-3 pb-4 h-full border-b-[#383838] border-b flex w-full flex-col justify-between group ">
      <div className="flex-row flex justify-between">
        <p className="font-bold text-purple-500 mb-1  font-base">{label}</p>
        <X
          className="h-full group-hover:opacity-100 opacity-0 cursor-pointer transition-all duration-200 text-red-500 "
          size={17}
          onClick={onDelete}
        />
      </div>
      <div className="flex flex-row gap-2 flex-wrap ">
        {opts.map((opt) => (
          <div className="flex flex-col   gap-[2px] mt-3" key={opt.label}>
            <p className="text-white/70 min-w-[50px] text-[12px] text-left mb-1 pt-1">
              {opt.label}
            </p>
            <input
              type="number"
              min={0}
              className="bg-secondary py-1 px-2 rounded outline-0"
              value={safePadding[opt.value]} // now safe
              onChange={(e) => {
                const cleaned = e.target.value.replace(/^0+(?=\d)/, "");
                e.target.value = cleaned;
                handlePaddingChange(opt.value, e.target.value);
              }}
              style={{ width: 57 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
