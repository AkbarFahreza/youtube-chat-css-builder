// "use client";
import { X } from "lucide-react";

export function FontSizeConfig({
  label,
  inputValue,
  onChange,
  onDelete,
  // onBlur,
}) {
  return (
    <div className="w-full group flex flex-row justify-between py-9 gap-3 border-b border-b-[#383838] items-center max-h-[50px] pl-3">
      <div className="w-full flex flex-col px-4">
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
