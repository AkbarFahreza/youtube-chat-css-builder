"use client";
import { ChevronDown, FolderClosed } from "lucide-react";
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

  return (
    <div>
      {/* Section Title */}
      <div
        className={`flex items-center gap-3 pl-1 pr-2 py-2 ${
          subSections.length > 0 ? "cursor-pointer" : ""
        }`}
        onClick={() => subSections.length > 0 && setCollapsed((c) => !c)}
      >
        <div className="text-xs flex gap-3 items-center flex-row uppercase tracking-widest text-gray-400 font-semibold flex-1">
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
          className="ml-2 relative text-purple-600 cursor-pointer transition-all text-lg px-3 py-[1px] rounded-[7px] bg-purple-800/20 border border-purple-600 hover:bg-purple-800/60 duration-200"
          aria-label={`Add option to ${title}`}
        >
          +
        </button>
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute w-fit mt-2 left-[290px] bg-[#23262F] border border-gray-800 rounded shadow-lg z-20 min-w-[140px]"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                className="block w-full px-4 py-2 text-left text-gray-200 hover:bg-blue-900/30 disabled:opacity-50"
                onClick={() => {
                  onAddOption(opt.value);
                  setShowMenu(false);
                }}
                disabled={activeOptions.includes(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Options/Children */}
      <div className="pl-4">{children}</div>

      {/* Subsections */}
      {subSections.length > 0 && !collapsed && (
        <div className="ml-3 pl-5 border-l border-gray-700/80">
          {subSections.map((sub) => (
            <ConfigSection key={sub.title} {...sub} isSubsection={true} />
          ))}
        </div>
      )}
    </div>
  );
}
