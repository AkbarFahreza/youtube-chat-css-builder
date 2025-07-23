// config-editor/padding-config.jsx
"use client";
import React from "react";
import { X } from "lucide-react";

export default function PaddingConfig({
  padding,
  setPadding,
  onDelete,
  label,
}) {
  // ensure we always have all four sides
  const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
  const safePadding = { ...defaultPadding, ...padding };

  // update one side, preserving the rest
  const handlePaddingChange = (side, rawValue) => {
    const num = Number(rawValue);
    const updated = {
      ...safePadding,
      [side]: isNaN(num) ? 0 : num,
    };
    setPadding(updated);
  };

  const sides = [
    { label: "Top", value: "top" },
    { label: "Right", value: "right" },
    { label: "Bottom", value: "bottom" },
    { label: "Left", value: "left" },
  ];

  return (
    <div className="pt-3 pb-4 border-b border-white/20 flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <p className="font-bold text-purple-500">{label}</p>
        <X
          size={17}
          className="text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition"
          onClick={onDelete}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {sides.map((side) => (
          <div key={side.value} className="flex flex-col">
            <span className="text-white/70 text-xs">{side.label}</span>
            <input
              type="number"
              min={0}
              className="bg-secondary p-1 rounded text-sm text-white outline-none"
              value={safePadding[side.value]}
              onChange={(e) => handlePaddingChange(side.value, e.target.value)}
              style={{ width: 55 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
