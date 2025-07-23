"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { AlignLeft, AlignCenter, AlignRight, X } from "lucide-react";
import { useGoogleFonts } from "@/app/stores/useGlobalFonts";
import FontSelector from "./font-selector";
import "@melloware/coloris/dist/coloris.css";

let Coloris;

export default function FontEditor({
  label = "Font",
  value,
  onChange,
  onDelete,
}) {
  const { fonts, isLoaded, setFonts } = useGoogleFonts();
  const inputRef = useRef(null);

  // States
  const [fontFamily, setFontFamily] = useState(value?.fontFamily || "Inter");
  const [fontColor, setFontColor] = useState(value?.fontColor || "#ffffff");
  const [fontWeight, setFontWeight] = useState(value?.fontWeight || "400");
  const [fontSize, setFontSize] = useState(value?.fontSize || 16);
  const [lineHeight, setLineHeight] = useState(value?.lineHeight || "normal");
  const [textAlign, setTextAlign] = useState(value?.textAlign || "left");

  // Font Info
  const selectedFont = useMemo(
    () => fonts.find((f) => f.family === fontFamily),
    [fonts, fontFamily]
  );

  const fontFamilyCss = selectedFont
    ? `font-family: '${selectedFont.family}', ${selectedFont.category};`
    : "";

  const cssImport = selectedFont
    ? (() => {
        const weights = selectedFont.variants.filter(
          (v) => !v.includes("italic") && v !== "regular"
        );
        const weightParam = weights.length ? `:wght@${weights.join(";")}` : "";
        const familyParam = selectedFont.family.replace(/ /g, "+");
        return `@import url('https://fonts.googleapis.com/css2?family=${familyParam}${weightParam}&display=swap');`;
      })()
    : "";

  // Load fonts once
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
  }, [isLoaded, setFonts, fontFamily]);

  // Load selected font
  useEffect(() => {
    if (!selectedFont) return;
    const weights = selectedFont.variants.filter(
      (v) => !v.includes("italic") && v !== "regular"
    );
    const weightParam = weights.length ? `:wght@${weights.join(";")}` : "";
    const familyParam = selectedFont.family.replace(/ /g, "+");
    const id = `google-font-${familyParam}-${weights.join("-") || "base"}`;

    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${familyParam}${weightParam}&display=swap`;
      document.head.appendChild(link);
    }
  }, [selectedFont]);

  // Sync with parent
  useEffect(() => {
    onChange?.({
      cssImport,
      fontFamilyCss,
      fontFamily,
      fontColor,
      fontWeight,
      fontSize,
      textAlign,
      lineHeight,
    });
  }, [
    cssImport,
    fontFamilyCss,
    fontFamily,
    fontColor,
    fontWeight,
    fontSize,
    textAlign,
    lineHeight,
    onChange,
  ]);

  // Setup Coloris
  useEffect(() => {
    import("@melloware/coloris").then((mod) => {
      Coloris = mod.default;
      Coloris.init();

      const el = inputRef.current;
      const handleInput = (e) => {
        const val = e.target.value;
        setFontColor(val);
        onChange?.({
          cssImport,
          fontFamilyCss,
          fontFamily,
          fontColor: val,
          fontWeight,
          fontSize,
          textAlign,
          lineHeight,
        });
      };

      el?.addEventListener("input", handleInput);
      return () => el?.removeEventListener("input", handleInput);
    });
  }, [onChange]);

  return (
    <div className="pt-3 pb-4 border-b border-b-[#383838] flex flex-col gap-3 group w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-bold text-purple-500 text-base">{label}</p>
        <X
          className="cursor-pointer text-red-500 opacity-0 group-hover:opacity-100 transition"
          size={17}
          onClick={onDelete}
        />
      </div>

      {/* Font Selector + Color */}
      <div className="flex gap-2 items-center">
        <FontSelector
          selectedFont={selectedFont}
          fonts={fonts}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
        />
        <input
          ref={inputRef}
          type="text"
          data-coloris
          className="coloris bg-secondary py-1 px-2 rounded w-[90px]"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
      </div>

      {/* Weight & Size */}
      <div className="flex gap-2">
        <select
          className="bg-secondary py-1 px-2 rounded w-1/2"
          value={fontWeight}
          onChange={(e) => setFontWeight(e.target.value)}
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
          min={1}
          className="bg-secondary py-1 px-2 rounded w-1/2 "
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </div>

      {/* Line Height & Text Align */}
      <div className="flex items-end justify-between">
        <div className="w-full">
          <label className="block mb-1 text-[10px]">Line Height</label>
          <input
            className="bg-secondary py-1 px-2 rounded w-full"
            value={lineHeight}
            onChange={(e) => setLineHeight(e.target.value)}
            placeholder="e.g. 1.5, 24px, normal"
          />
        </div>
        <div className="flex items-center gap-3 pl-3">
          <button onClick={() => setTextAlign("left")}>
            <AlignLeft
              className={textAlign === "left" ? "text-blue-500" : ""}
            />
          </button>
          <button onClick={() => setTextAlign("center")}>
            <AlignCenter
              className={textAlign === "center" ? "text-blue-500" : ""}
            />
          </button>
          <button onClick={() => setTextAlign("right")}>
            <AlignRight
              className={textAlign === "right" ? "text-blue-500" : ""}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
