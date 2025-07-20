import React from "react";

export default function PaddingConfig({ padding, setPadding }) {
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
    <div className="pt-4 pb-6 border-b-gray-800 border-b">
      <p className="font-bold text-purple-500 mb-1 font-base">Padding</p>
      <div className="flex flex-row">
        {opts.map((opt) => (
          <div className="flex flex-col items-start mt-3" key={opt.label}>
            <p className="text-white/70 text-[10px] text-left mb-1">
              {opt.label}
            </p>
            <input
              type="number"
              className="rz-input"
              value={padding[opt.value]}
              onChange={(e) => handlePaddingChange(opt.value, e.target.value)}
              style={{ width: 60, marginLeft: 8, marginRight: 16 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
