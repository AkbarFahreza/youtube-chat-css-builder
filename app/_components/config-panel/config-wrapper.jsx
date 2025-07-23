"use client";
import PaddingConfig from "./config-editor/padding-config";
// import { BooleanConfig, FontSizeConfig } from "./style-config";
import ColorSelector from "./config-editor/color-selector";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CssOutput from "./css-output";
import { BooleanSelector } from "./config-editor/boolean-selector";
import FontEditor from "./config-editor/font-config";

export default function ConfigWrapper({
  generalConfig,
  updateGeneralConfig,
  nameConfig,
  updateNameConfig,
  msgConfig,
  updateMsgConfig,
  cssOutput,
}) {
  const [mode, setMode] = useState("design");
  return (
    <div
      id="config-wrapper"
      className="max-w-[400px] bg-main  flex-1 border-l pt-3 border-[#383838] px-3"
    >
      <div className="flex flex-row gap-1 pb-2">
        <button
          className={`py-1 px-3 rounded-md  hover:bg-[#383838] ${
            mode === "design" ? "bg-[#383838] text-white" : "text-white/55"
          }`}
          onClick={() => {
            setMode("design");
          }}
        >
          Configure
        </button>
        <button
          className={`py-1 px-3 rounded-md  hover:bg-[#383838] ${
            mode === "output" ? "bg-[#383838] text-white" : "text-white/55"
          }`}
          onClick={() => {
            setMode("output");
          }}
        >
          Output Code
        </button>
      </div>
      {mode === "design" ? (
        <ChatConfigPanel
          generalConfig={generalConfig}
          updateGeneralConfig={updateGeneralConfig}
          nameConfig={nameConfig}
          updateNameConfig={updateNameConfig}
          msgConfig={msgConfig}
          updateMsgConfig={updateMsgConfig}
        />
      ) : (
        <CssOutput cssOutput={cssOutput} />
      )}
    </div>
  );
}
function ChatConfigPanel({
  generalConfig,
  updateGeneralConfig,
  nameConfig,
  updateNameConfig,
  msgConfig,
  updateMsgConfig,
}) {
  const FlexDirOpts = [
    { label: "row", value: "row" },
    { label: "column", value: "column" },
  ];
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="max-h-[90vh] min-h-[90vh] pr-3 overflow-y-scroll scrollbar">
      <div
        className="py-3 border-b-secondary border-b rounded-md flex flex-row justify-between items-center"
        onClick={() => setCollapsed(!collapsed)}
      >
        <p className="font-bold text-white">Viewer Chat Config</p>
        <ChevronDown
          size={18}
          className={`${
            collapsed ? "-rotate-90" : ""
          } transition-all duration-200`}
        />
      </div>

      <div className={`${collapsed ? "hidden" : ""}`}>
        {/* General Content Configs */}
        {generalConfig.contentActive.includes("padding") && (
          <PaddingConfig
            label="Content Padding"
            padding={generalConfig.padding}
            setPadding={(p) => updateGeneralConfig("padding", p)}
            onDelete={() => {
              updateGeneralConfig("padding", {
                top: 2,
                right: 2,
                bottom: 2,
                left: 2,
              });
              updateGeneralConfig(
                "contentActive",
                generalConfig.contentActive.filter((opt) => opt !== "padding")
              );
            }}
          />
        )}

        {generalConfig.contentActive.includes("flexDirection") && (
          <BooleanSelector
            label="Content Flex Direction"
            opts={FlexDirOpts}
            value={generalConfig.flexDirection}
            setValue={(v) => updateGeneralConfig("flexDirection", v)}
            onDelete={() => {
              updateGeneralConfig("flexDirection", "row");
              updateGeneralConfig(
                "contentActive",
                generalConfig.contentActive.filter(
                  (opt) => opt !== "flexDirection"
                )
              );
            }}
          />
        )}

        {/* Name Configs */}
        {nameConfig.active.includes("nameBgColor") && (
          <ColorSelector
            label="Name Background Color"
            inputValue={nameConfig.bgColor}
            onChange={(e) => updateNameConfig("bgColor", e.target.value)}
            onDelete={() => {
              updateNameConfig("bgColor", "#a819fe");
              updateNameConfig(
                "active",
                nameConfig.active.filter((opt) => opt !== "nameBgColor")
              );
            }}
          />
        )}

        {nameConfig.active.includes("nameFontFamily") && (
          <FontEditor
            label="Name Font"
            value={{
              fontFamily: nameConfig.fontFamily,
              fontColor: nameConfig.fontColor,
              fontWeight: nameConfig.fontWeight,
              lineHeight: nameConfig.lineHeight,
              textAlign: nameConfig.textAlign,
              fontSize: nameConfig.fontSize,
            }}
            onChange={(val) => {
              updateNameConfig("fontFamily", val.fontFamily);
              updateNameConfig("fontColor", val.fontColor);
              updateNameConfig("fontWeight", val.fontWeight);
              updateNameConfig("lineHeight", val.lineHeight);
              updateNameConfig("textAlign", val.textAlign);
              updateNameConfig("fontSize", val.fontSize);
            }}
            onDelete={() => {
              updateNameConfig("fontFamily", "Inter");
              updateNameConfig("fontColor", "#ffffff");
              updateNameConfig("fontWeight", "400");
              updateNameConfig("lineHeight", "normal");
              updateNameConfig("textAlign", "left");
              updateNameConfig("fontSize", 15);
              updateNameConfig(
                "active",
                nameConfig.active.filter((o) => o !== "nameFontFamily")
              );
            }}
          />
        )}

        {nameConfig.active.includes("namePadding") && (
          <PaddingConfig
            label="Name Padding"
            padding={nameConfig.padding}
            setPadding={(updated) => updateNameConfig("padding", updated)}
            onDelete={() => {
              updateNameConfig("padding", {
                top: 2,
                right: 2,
                bottom: 2,
                left: 2,
              });
              updateNameConfig(
                "active",
                nameConfig.active.filter((opt) => opt !== "namePadding")
              );
            }}
          />
        )}

        {/* Message Configs */}
        {msgConfig.active.includes("msgBgColor") && (
          <ColorSelector
            label="Message Background Color"
            inputValue={msgConfig.bgColor}
            onChange={(e) => updateMsgConfig("bgColor", e.target.value)}
            onDelete={() => {
              updateMsgConfig("bgColor", "#a819fe");
              updateMsgConfig(
                "active",
                msgConfig.active.filter((opt) => opt !== "msgBgColor")
              );
            }}
          />
        )}

        {msgConfig.active.includes("msgFontFamily") && (
          <FontEditor
            label="Message Font"
            value={{
              fontFamily: msgConfig.fontFamily,
              fontColor: nameConfig.fontColor,
              fontWeight: msgConfig.fontWeight,
              lineHeight: msgConfig.lineHeight,
              textAlign: msgConfig.textAlign,
              fontSize: msgConfig.fontSize,
            }}
            onChange={(val) => {
              updateMsgConfig("fontFamily", val.fontFamily);
              updateMsgConfig("fontColor", val.fontColor);
              updateMsgConfig("fontWeight", val.fontWeight);
              updateMsgConfig("lineHeight", val.lineHeight);
              updateMsgConfig("textAlign", val.textAlign);
              updateMsgConfig("fontSize", val.fontSize);
            }}
            onDelete={() => {
              updateMsgConfig("fontFamily", "Inter");
              updateMsgConfig("fontColor", "#ffffff");
              updateMsgConfig("fontWeight", "400");
              updateMsgConfig("lineHeight", "normal");
              updateMsgConfig("textAlign", "left");
              updateMsgConfig("fontSize", 15);
              updateMsgConfig(
                "active",
                msgConfig.active.filter((o) => o !== "msgFontFamily")
              );
            }}
          />
        )}

        {msgConfig.active.includes("msgPadding") && (
          <PaddingConfig
            label="Message Padding"
            padding={msgConfig.padding}
            setPadding={(p) => updateMsgConfig("padding", p)}
            onDelete={() => {
              updateMsgConfig("padding", {
                top: 2,
                right: 2,
                bottom: 2,
                left: 2,
              });
              updateMsgConfig(
                "active",
                msgConfig.active.filter((opt) => opt !== "msgPadding")
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
