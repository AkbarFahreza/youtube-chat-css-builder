// hooks/useViewerConfig.js
"use client";

import { useState, useEffect, useCallback } from "react";

export function useViewerConfig(fonts) {
  // General state
  const [nameActive, setNameActive] = useState([]);
  const [msgActive, setMsgActive] = useState([]);

  // Name configuration
  const [nameFontFamily, setNameFontFamily] = useState(fonts[0]);
  const [nameFontWeight, setNameFontWeight] = useState("400");
  const [nameLineHeight, setNameLineHeight] = useState("normal");
  const [nameTextAlign, setNameTextAlign] = useState("left");
  const [nameFontSize, setNameFontSize] = useState(16);
  const [nameFontColor, setNameFontColor] = useState("#ffffff");

  // Message configuration
  const [msgFontFamily, setMsgFontFamily] = useState(fonts[0]);
  const [msgFontWeight, setMsgFontWeight] = useState("400");
  const [msgLineHeight, setMsgLineHeight] = useState("normal");
  const [msgTextAlign, setMsgTextAlign] = useState("left");
  const [msgFontSize, setMsgFontSize] = useState(16);
  const [msgFontColor, setMsgFontColor] = useState("#ffffff");

  return {
    nameConfig: {
      active: nameActive,
      setActive: setNameActive,
      fontFamily: nameFontFamily,
      setFontFamily: setNameFontFamily,
      fontWeight: nameFontWeight,
      setFontWeight: setNameFontWeight,
      lineHeight: nameLineHeight,
      setLineHeight: setNameLineHeight,
      textAlign: nameTextAlign,
      setTextAlign: setNameTextAlign,
      fontSize: nameFontSize,
      setFontSize: setNameFontSize,
      fontColor: nameFontColor,
      setFontColor: setNameFontColor,
    },
    msgConfig: {
      active: msgActive,
      setActive: setMsgActive,
      fontFamily: msgFontFamily,
      setFontFamily: setMsgFontFamily,
      fontWeight: msgFontWeight,
      setFontWeight: setMsgFontWeight,
      lineHeight: msgLineHeight,
      setLineHeight: setMsgLineHeight,
      textAlign: msgTextAlign,
      setTextAlign: setMsgTextAlign,
      fontSize: msgFontSize,
      setFontSize: setMsgFontSize,
      fontColor: msgFontColor,
      setFontColor: setMsgFontColor,
    },
  };
}
