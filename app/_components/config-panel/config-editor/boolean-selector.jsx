// "use client";
import { X } from "lucide-react";
export function BooleanSelector({ label, opts, value, setValue, onDelete }) {
  return (
    <div className="w-full group flex flex-row justify-between py-4 gap-3 border-b border-b-white/20 items-center">
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between pb-2">
          <p className="text-white font-bold">{label}</p>
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
