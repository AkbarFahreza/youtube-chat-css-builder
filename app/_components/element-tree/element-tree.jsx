"use client";
import { ChevronDown, CircleCheck, FolderClosed } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

export default function ConfigSection({
  title,
  options,
  activeOptions,
  onAddOption,
  children,
  subSections = [],
  isSubsection = false, // NEW: default to false
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);
  // console.log(activeOptions);
  return (
    <div>
      {/* Section Title */}
      <div
        className={`flex items-center  pl-3 rounded-sm  group hover:bg-[#383838] max-h-[30px] ${
          subSections.length > 0 ? "cursor-pointer" : ""
        }`}
      >
        <div
          className={` flex gap-3 items-center flex-row  pr-2 py-2  tracking-widest  font-semibold flex-1 ${
            !isSubsection ? "text-purple-500" : ""
          }`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {!isSubsection && (
            <ChevronDown
              size={16}
              className={`transition-transform ${
                collapsed ? "-rotate-90" : ""
              }`}
            />
          )}
          <span>{title}</span>
        </div>
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu((v) => !v);
          }}
          className="ml-2 relative text-purple-600 cursor-pointer transition-all text-2xl px-3 py-[1px] rounded-[7px] duration-200 group-hover:block hidden"
          aria-label={`Add option to ${title}`}
        >
          +
        </button>
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute w-fit mt-2 left-[220px] bg-secondary border border-white/20 rounded shadow-lg z-20 min-w-[140px]"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                className={`w-full flex flex-row px-4 py-2 gap-3 items-center text-left text-gray-200 hover:bg-blue-900/30 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                  activeOptions.includes(opt.value) ? "text-green-500" : ""
                }`}
                onClick={() => {
                  onAddOption(opt.value);
                  setShowMenu(false);
                }}
                disabled={activeOptions.includes(opt.value)}
              >
                {opt.label}
                {activeOptions.includes(opt.value) && <CircleCheck size={16} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Options/Children */}
      <div className="pl-4">{children}</div>

      {/* Subsections */}
      {subSections.length > 0 && !collapsed && (
        <div className="ml-5 pl-2 border-l border-[#383838] text-gray-400">
          {subSections.map((sub) => (
            <ConfigSection key={sub.title} {...sub} isSubsection={true} />
          ))}
        </div>
      )}
    </div>
  );
}
