"use client";
import { Trash2, X } from "lucide-react";

export function FontSizeConfig({
  label,
  inputValue,
  onChange,
  onDelete,
  // onBlur,
}) {
  return (
    <div className="w-full group flex flex-row justify-between py-9 gap-3 border-b border-b-[#383838] items-center max-h-[50px] pl-3">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between ">
          <p className="text-purple-500 font-bold">{label}</p>
          <X
            className="h-full group-hover:opacity-100 opacity-0 cursor-pointer transition-all duration-200 text-red-500 "
            size={17}
            onClick={onDelete}
          />
        </div>
        <input
          type="number"
          value={inputValue}
          // value={nameFontSize}
          min={5}
          max={48}
          onChange={onChange}
          style={{ width: 60 }}
          className="rz-input mt-3 m-2"
          // onBlur={onBlur}
        />
      </div>
    </div>
  );
}

export function BooleanConfig({ label, opts, value, setValue, onDelete }) {
  return (
    <div className="w-full group flex flex-row justify-between py-4 gap-3 border-b border-b-[#383838] items-center pl-3">
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between ">
          <p className="text-purple-400 font-bold">{label}</p>
          <X
            className="h-full group-hover:opacity-100 opacity-0 cursor-pointer transition-all duration-200 text-red-500 "
            size={17}
            onClick={onDelete}
          />
        </div>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className=" py-2 px-3 bg-secondary mt-3 border border-white/20 rounded z-20 w-full"
        >
          {opts.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
