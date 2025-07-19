import React from "react";

export default function ViewerChatConfig({
  padding,
  setPadding,
  cssOutput,
  copyToClipboard,
}) {
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
    <div>
      <p className="text-purple-500 font-bold mb-1">Padding</p>
      <div className="flex flex-row">
        {opts.map((opt) => (
          <div className="flex flex-row items-center">
            <label>
              {opt.label}
              <input
                type="number"
                className="[appearance:textfield] -translate-x-3 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-purple-800/20 py-[2px] px-2 rounded-md outline-0"
                value={padding[opt.value]}
                onChange={(e) => handlePaddingChange(opt.value, e.target.value)}
                style={{ width: 60, marginLeft: 8, marginRight: 16 }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
