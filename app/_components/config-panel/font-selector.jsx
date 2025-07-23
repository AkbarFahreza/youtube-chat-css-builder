"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function FontSelector({ fonts, fontFamily, setFontFamily }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef();

  const filteredFonts = fonts.filter((font) =>
    font.family.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-secondary py-1 px-2 rounded w-full flex items-center justify-between"
      >
        <span>{fontFamily || "Select Font"}</span>
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 bg-secondary border border-white/20  rounded w-full max-h-64 overflow-auto shadow-lg">
          <input
            type="text"
            placeholder="Search font..."
            className="w-full px-3 py-2  border-b  outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <ul className="max-h-48 overflow-y-auto">
            {filteredFonts.map((font) => (
              <li
                key={font.family}
                onClick={() => {
                  setFontFamily(font.family);
                  setOpen(false);
                }}
                className="px-3 py-2 hover:bg-zinc-700 cursor-pointer"
                style={{ fontFamily: font.family }}
              >
                {font.family}
              </li>
            ))}

            {filteredFonts.length === 0 && (
              <li className="px-3 py-2 text-zinc-400 italic">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
