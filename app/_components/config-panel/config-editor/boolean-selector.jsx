// "use client";
import { Link2, X } from "lucide-react";
export function BooleanSelector({
  label,
  opts,
  value,
  prefix,
  setSync,
  setValue,
  onDelete,
}) {
  return (
    <div className="w-full group flex flex-row justify-between py-5 gap-3 border-b border-b-white/20 items-center">
      <div className="flex flex-col w-full px-4">
        <div className="flex flex-row justify-between pb-2">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-white">{label}</p>
            {prefix !== "content" && (
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
