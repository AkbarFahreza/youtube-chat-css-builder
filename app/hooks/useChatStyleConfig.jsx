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
const defaultContentStyle = {
  active: [],
  contentPadding: { top: 2, right: 2, bottom: 2, left: 2 },
  contentMargin: { top: 2, right: 2, bottom: 2, left: 2 },
  avatar: "block",
  flexDirection: "row",
  contentBgColor: "#a819fe",
};
export default function useChatStyleConfig() {
  const [roleConfigs, setRoleConfigs] = useState({
    viewer: {
      content: { ...defaultContentStyle },
      name: { ...defaultStyle },
      message: { ...defaultStyle },
    },
    moderator: {
      content: { ...defaultContentStyle },
      name: { ...defaultStyle, fontColor: "#4f7bff" },
      message: { ...defaultStyle },
    },
    member: {
      content: { ...defaultContentStyle },
      name: { ...defaultStyle, fontColor: "#2ba640" },
      message: { ...defaultStyle },
    },
    owner: {
      content: { ...defaultContentStyle },
      name: { ...defaultStyle, bgColor: "#ffd600", fontColor: "#000000" },
      message: { ...defaultStyle },
    },
  });

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
    roleConfigs,
    updateRoleConfig,
  };
}
