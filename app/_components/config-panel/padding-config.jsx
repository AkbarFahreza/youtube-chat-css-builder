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
    <div className="pt-4 pb-6 h-full border-b-gray-800 border-b flex w-full flex-row justify-between group pl-3">
      <div>
        <p className="font-bold text-purple-500 mb-1 font-base">{label}</p>
        <div className="flex flex-row">
          {opts.map((opt) => (
            <div className="flex flex-col items-start mt-3" key={opt.label}>
              <p className="text-white/70 text-[10px] text-left mb-1">
                {opt.label}
              </p>
              <input
                type="number"
                min={0}
                className="rz-input"
                value={safePadding[opt.value]} // now safe
                onChange={(e) => handlePaddingChange(opt.value, e.target.value)}
                style={{ width: 40, marginLeft: 8, marginRight: 16 }}
              />
            </div>
          ))}
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
