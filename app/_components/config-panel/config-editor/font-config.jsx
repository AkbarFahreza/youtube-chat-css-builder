"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { AlignLeft, AlignCenter, AlignRight, X, Link2 } from "lucide-react";
import { useGoogleFonts } from "@/app/stores/useGlobalFonts";
import FontSelector from "./font-selector";
import "@melloware/coloris/dist/coloris.css";

let Coloris;

export default function FontEditor({
  label = "Font",
  value,
  onChange,
  onDelete,
  setSync,
  prefix,
}) {
  const { fonts, isLoaded, setFonts } = useGoogleFonts();
  const inputRef = useRef(null);
  const prev = useRef({});
  const clickedOnce = useRef(false);

  // Local state for each field
  const [fontFamily, setFontFamily] = useState(value?.fontFamily || "Inter");
  const [fontColor, setFontColor] = useState(value?.fontColor || "#ffffff");
  const [fontWeight, setFontWeight] = useState(value?.fontWeight || "400");
  const [fontSize, setFontSize] = useState(value?.fontSize || 16);
  const [lineHeight, setLineHeight] = useState(value?.lineHeight || "");
  const [textAlign, setTextAlign] = useState(value?.textAlign || "left");

  // ─── Sync local state only when `value` truly changes ───────────────────────
  const prevValueRef = useRef({});
  useEffect(() => {
    if (!value) return;
    const v = value;
    const prevV = prevValueRef.current;

    // check if any top-level prop changed
    const changed = [
      "fontFamily",
      "fontColor",
      "fontWeight",
      "fontSize",
      "lineHeight",
      "textAlign",
    ].some((key) => prevV[key] !== v[key]);

    if (!changed) return;
    prevValueRef.current = { ...v };

    setFontFamily(v.fontFamily || "Inter");
    setFontColor(v.fontColor || "#ffffff");
    setFontWeight(v.fontWeight || "400");
    setFontSize(v.fontSize || 16);
    setLineHeight(v.lineHeight || "");
    setTextAlign(v.textAlign || "left");
  }, [value]);

  // ─── Font info and loading ─────────────────────────────────────────────────
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

  // ─── Propagate user edits upward ────────────────────────────────────────────
  useEffect(() => {
    const current = {
      cssImport,
      fontFamilyCss,
      fontFamily,
      fontColor,
      fontWeight,
      fontSize,
      textAlign,
      lineHeight,
    };
    const changed = Object.entries(current).some(
      ([key, val]) => prev.current[key] !== val
    );
    if (changed) {
      prev.current = { ...current };
      onChange?.(current);
    }
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

  // ─── Coloris setup ─────────────────────────────────────────────────────────
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
  }, [
    onChange,
    cssImport,
    fontFamilyCss,
    fontFamily,
    fontWeight,
    fontSize,
    textAlign,
    lineHeight,
  ]);

  // ─── UI ─────────────────────────────────────────────────────────────────────
  return (
    <div className="py-5 border-b border-b-white/20 flex flex-col gap-3 group w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 px-4 z-50">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-white">{label}</p>
          {prefix !== "name" && prefix !== "msg" && setSync && (
            <div className="group/sync relative cursor-pointer">
              <Link2
                className="group-hover/sync:text-purple-500"
                size={16}
                onClick={setSync}
              />
              <p className="group-hover/sync:flex hidden border border-white/30 py-1 px-2 bg-secondary rounded-sm absolute -bottom-11 left-1/2 -translate-x-1/2 text-nowrap">
                Sync with Viewer
              </p>
            </div>
          )}
        </div>
        <X
          className="cursor-pointer text-red-500 opacity-0 group-hover:opacity-100 transition"
          size={17}
          onClick={onDelete}
        />
      </div>

      {/* Font Selector + Color */}
      <div className="flex gap-2 items-center px-4">
        <FontSelector
          selectedFont={selectedFont}
          fonts={fonts}
          fontFamily={fontFamily}
          setFontFamily={(v) => setFontFamily(v)}
        />
        <input
          ref={inputRef}
          type="text"
          data-coloris
          className="coloris bg-secondary py-1 px-3 rounded w-[90px]"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
      </div>

      {/* Weight & Size */}
      <div className="flex gap-2 px-4">
        <select
          className="bg-secondary py-1 px-3 rounded w-1/2"
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
          className="bg-secondary py-1 px-3 rounded w-1/2"
          value={fontSize}
          onClick={(e) => {
            if (!clickedOnce.current) {
              e.currentTarget.select();
              clickedOnce.current = true;
            }
          }}
          onBlur={() => (clickedOnce.current = false)}
          onChange={(e) => {
            let val = e.target.value.replace(/^0+(?=\d)/, "");
            val = Number(val) < 1 ? "1" : val;
            setFontSize(Number(val));
          }}
        />
      </div>

      {/* Line Height & Text Align */}
      <div className="flex items-end justify-between px-4">
        <div className="w-full">
          <label className="block mb-1 text-white/70 text-xs">
            Line Height
          </label>
          <input
            className="bg-secondary py-1 px-3 rounded w-full"
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
