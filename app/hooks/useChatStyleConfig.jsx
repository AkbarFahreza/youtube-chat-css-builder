"use client";
import { useState } from "react";

export default function useChatStyleConfig() {
  // General Config
  const [generalConfig, setGeneralConfig] = useState({
    contentActive: [],
    padding: { top: 2, right: 2, bottom: 2, left: 2 },
    flexDirection: "row",
  });

  // Name Section Config
  const [nameConfig, setNameConfig] = useState({
    active: [],
    fontFamily: "Inter",
    fontColor: "#ffffff",
    fontWeight: "400",
    lineHeight: "normal",
    textAlign: "left",
    bgColor: "#a819fe",
    fontSize: 15,
    padding: { top: 2, right: 2, bottom: 2, left: 2 },
  });

  // Message Section Config
  const [msgConfig, setMsgConfig] = useState({
    active: [],
    fontFamily: "Inter",
    fontColor: "#ffffff",
    fontWeight: "400",
    lineHeight: "normal",
    textAlign: "left",
    bgColor: "#a819fe",
    fontSize: 15,
    padding: { top: 2, right: 2, bottom: 2, left: 2 },
  });

  // Helpers to update any field
  const updateGeneralConfig = (key, value) => {
    setGeneralConfig((prev) => ({ ...prev, [key]: value }));
  };

  const updateNameConfig = (key, value) => {
    setNameConfig((prev) => ({ ...prev, [key]: value }));
  };

  const updateMsgConfig = (key, value) => {
    setMsgConfig((prev) => ({ ...prev, [key]: value }));
  };

  return {
    generalConfig,
    updateGeneralConfig,
    nameConfig,
    updateNameConfig,
    msgConfig,
    updateMsgConfig,
  };
}
