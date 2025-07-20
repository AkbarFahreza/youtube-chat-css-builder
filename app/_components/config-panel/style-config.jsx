"use client";
import { Trash2, X } from "lucide-react";

export function FontSizeConfig({ label, inputValue, onChange, onDelete }) {
  return (
    <div className="w-full group flex flex-row justify-between py-5 gap-3 border-b border-b-gray-800 items-center max-h-[50px] pl-3">
      <div className="w-full flex flex-row justify-between align-items">
        <p className=" font-bold text-purple-500">{label}</p>
        <input
          type="number"
          value={inputValue}
          // value={nameFontSize}
          min={5}
          max={48}
          onChange={onChange}
          // onChange={(e) => setNameFontSize(Number(e.target.value))}
          style={{ width: 60 }}
          className="rz-input"
        />
      </div>
      <X
        className="h-full group-hover:opacity-100 opacity-0 cursor-pointer transition-all duration-200 text-red-500 "
        size={17}
        onClick={onDelete}
      />
    </div>
  );
}

export function BooleanConfig({ label, opts, value, setValue, onDelete }) {
  return (
    <div className="w-full group flex flex-row justify-between py-5 gap-3 border-b border-b-gray-800 items-center pl-3">
      <div className="flex flex-row items-center justify-between w-full">
        <p className=" font-bold text-purple-500">{label}</p>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-fit py-2 px-3 bg-[#23262F] border border-gray-800 rounded shadow-lg z-20 min-w-[140px]"
        >
          {opts.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <X
        className="h-full group-hover:opacity-100 opacity-0 cursor-pointer transition-all duration-200 text-red-500 "
        size={17}
        onClick={onDelete}
      />
    </div>
  );
}
