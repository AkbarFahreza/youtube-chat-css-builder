"use client";

import { useEffect, useState, useMemo } from "react";
import { AlignLeft, AlignCenter, AlignRight, Trash2 } from "lucide-react";
import { useGoogleFonts } from "@/app/stores/useGlobalFonts";
import FontSelector from "./font-selector";
export default function FontEditor({
  label = "Font",
  value,
  onChange,
  onDelete,
}) {
  const { fonts, isLoaded, setFonts } = useGoogleFonts();

  const [searchQuery, setSearchQuery] = useState("");
  const [fontFamily, setFontFamily] = useState(value?.fontFamily || "Inter");
  const [weight, setWeight] = useState(value?.fontWeight || "400");
  const [fontSize, setFontSize] = useState(value?.fontSize || 16);
  const [lineHeight, setLineHeight] = useState(value?.lineHeight || "normal");
  const [align, setAlign] = useState(value?.textAlign || "left");

  const selectedFont = useMemo(
    () => fonts.find((f) => f.family === fontFamily),
    [fontFamily, fonts]
  );

  const filteredFonts = useMemo(() => {
    return fonts.filter((font) =>
      font.family.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [fonts, searchQuery]);

  useEffect(() => {
    if (!isLoaded) {
      fetch("/api/fonts")
        .then((res) => res.json())
        .then((data) => {
          setFonts(data);
          if (!data.find((f) => f.family === fontFamily)) {
            setFontFamily("Inter");
          }
        });
    }
  }, [isLoaded, setFonts]);

  useEffect(() => {
    if (!selectedFont) return;

    const weights = selectedFont.variants.filter((v) => !v.includes("italic"));
    const id = `google-font-${selectedFont.family}`;

    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.family.replace(
      / /g,
      "+"
    )}:wght@${weights.join(";")}&display=swap`;
    document.head.appendChild(link);
  }, [selectedFont]);

  const cssImport = selectedFont
    ? `@import url('https://fonts.googleapis.com/css2?family=${selectedFont.family.replace(
        / /g,
        "+"
      )}:wght@${selectedFont.variants
        .filter((v) => !v.includes("italic") && v !== "regular")
        .join(";")}&display=swap');`
    : "";

  const fontFamilyCss = selectedFont
    ? `font-family: '${selectedFont.family}', ${selectedFont.category};`
    : "";

  useEffect(() => {
    onChange?.({
      cssImport,
      fontFamilyCss,
      fontFamily,
      fontWeight: weight,
      fontSize,
      textAlign: align,
      lineHeight,
    });
  }, [
    cssImport,
    fontFamilyCss,
    fontFamily,
    weight,
    fontSize,
    align,
    lineHeight,
  ]);

  return (
    <div className="bg-zinc-900 p-4 text-white rounded space-y-4">
      <div className="flex items-center justify-between">
        <label className="block font-semibold">{label}</label>
        {onDelete && (
          <button
            className="text-red-400 hover:text-red-600 transition"
            onClick={onDelete}
            title="Remove font config"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Font Family */}
      {/* Font Search & Selector */}
      <FontSelector
        fonts={fonts}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
      />

      {/* Weight & Size */}
      <div className="flex gap-2">
        <select
          className="bg-zinc-800 p-2 rounded w-1/2"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        >
          {selectedFont?.variants
            ?.filter((v) => !v.includes("italic") && v !== "regular")
            .map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
        </select>
        <input
          type="number"
          className="bg-zinc-800 p-2 rounded w-1/2"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          min={1}
        />
      </div>

      {/* Line Height */}
      <div>
        <label className="block mb-1 text-sm">Line Height</label>
        <input
          className="bg-zinc-800 p-2 rounded w-full"
          value={lineHeight}
          onChange={(e) => setLineHeight(e.target.value)}
          placeholder="e.g. 1.5, 24px, normal"
        />
      </div>

      {/* Text Align */}
      <div className="flex items-center gap-3">
        <button onClick={() => setAlign("left")}>
          <AlignLeft
            size={18}
            className={align === "left" ? "text-blue-500" : ""}
          />
        </button>
        <button onClick={() => setAlign("center")}>
          <AlignCenter
            size={18}
            className={align === "center" ? "text-blue-500" : ""}
          />
        </button>
        <button onClick={() => setAlign("right")}>
          <AlignRight
            size={18}
            className={align === "right" ? "text-blue-500" : ""}
          />
        </button>
      </div>
    </div>
  );
}
