"use client";
import { useState } from "react";

const defaultStyle = {
  active: [],
  fontFamily: "Inter",
  fontColor: "#ffffff",
  fontWeight: "400",
  lineHeight: "",
  textAlign: "left",
  bgColor: "#a819fe",
  fontSize: 15,
  padding: { top: 2, right: 2, bottom: 2, left: 2 },
};

export default function useChatStyleConfig() {
  const [generalConfig, setGeneralConfig] = useState({
    contentActive: [],
    padding: { top: 2, right: 2, bottom: 2, left: 2 },
    flexDirection: "row",
  });

  const [roleConfigs, setRoleConfigs] = useState({
    viewer: {
      name: { ...defaultStyle },
      message: { ...defaultStyle },
    },
    moderator: {
      name: { ...defaultStyle, fontColor: "#4f7bff" },
      message: { ...defaultStyle },
    },
    member: {
      name: { ...defaultStyle, fontColor: "#2ba640" },
      message: { ...defaultStyle },
    },
  });

  const updateGeneralConfig = (key, value) => {
    setGeneralConfig((prev) => ({ ...prev, [key]: value }));
  };

  const updateRoleConfig = (role, type, key, value) => {
    setRoleConfigs((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [type]: {
          ...prev[role][type],
          [key]: value,
        },
      },
    }));
  };

  return {
    generalConfig,
    updateGeneralConfig,
    roleConfigs,
    updateRoleConfig,
  };
}
