// _components/config-panel/chat-config-panel.jsx
"use client";
import PaddingConfig from "./padding-config";
import { BooleanConfig, FontSizeConfig } from "./style-config";
import ColorSelector from "./color-selector";
import CodeBlock from "../code-bock";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ConfigWrapper({
  contentActive,
  setContentActive,
  padding,
  setPadding,
  namePadding,
  setNamePadding,
  flexDirection,
  setFlexDirection,
  nameActive,
  setNameActive,
  msgActive,
  setMsgActive,
  bgColor,
  setBgColor,
  nameFontSize,
  setNameFontSize,
  msgFontSize,
  setMsgFontSize,
  cssOutput,
}) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput.trim());
    alert("CSS copied to clipboard!");
  };

  return (
    <div
      id="config-wrapper"
      className="max-w-[400px] max-h-[100vh]   flex-1 border-l pt-6 border-gray-700 px-3"
    >
      <ChatConfigPanel
        contentActive={contentActive}
        setContentActive={setContentActive}
        padding={padding}
        setPadding={setPadding}
        namePadding={namePadding}
        setNamePadding={setNamePadding}
        flexDirection={flexDirection}
        setFlexDirection={setFlexDirection}
        nameActive={nameActive}
        setNameActive={setNameActive}
        msgActive={msgActive}
        setMsgActive={setMsgActive}
        bgColor={bgColor}
        setBgColor={setBgColor}
        nameFontSize={nameFontSize}
        setNameFontSize={setNameFontSize}
        msgFontSize={msgFontSize}
        setMsgFontSize={setMsgFontSize}
      />
      <div style={{ marginTop: 24 }}>
        <div className="flex flex-row justify-between items-center ">
          <h4 className="text-white font-semibold ">CSS Output:</h4>
          <button
            onClick={copyToClipboard}
            className="text-purple-500 bg-purple-800/25 border border-purple-500 hover:bg-purple-800/60 cursor-pointer transition-all duration-200 rounded-lg px-4 py-1"
          >
            Copy CSS
          </button>
        </div>
        <CodeBlock code={cssOutput.trim()} language="css" />
      </div>
    </div>
  );
}

function ChatConfigPanel({
  // viewer chat wrapper
  contentActive,
  setContentActive,
  padding,
  setPadding,
  flexDirection,
  setFlexDirection,
  // viewer Name config
  nameActive,
  bgColor,
  setBgColor,
  setNameActive,
  namePadding,
  setNamePadding,
  nameFontSize,
  setNameFontSize,
  // viewer Message config
  msgActive,
  setMsgActive,
  msgFontSize,
  setMsgFontSize,
}) {
  const FlexDirOpts = [
    { label: "row", value: "row" },
    { label: "column", value: "column" },
  ];
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-[62vh] max-h-[62vh] pr-3 overflow-y-scroll scrollbar">
      <div
        className="py-2 px-4 bg-gray-700/30 rounded-md flex flex-row justify-between items-center"
        onClick={() => setCollapsed(!collapsed)}
      >
        <p className="font-bold text-white ">Viewer Chat Config</p>
        <ChevronDown
          size={18}
          className={`${
            collapsed ? "-rotate-90" : ""
          } transition-all duration-200`}
        />
      </div>
      {/* Content Configs */}
      <div className={`${collapsed ? "hidden" : ""}`}>
        {contentActive.includes("padding") && (
          <PaddingConfig
            label="Content Padding"
            padding={padding}
            setPadding={setPadding}
            onDelete={() => {
              setPadding({
                top: 2,
                right: 2,
                bottom: 2,
                left: 2,
              });
              setContentActive((prev) =>
                prev.filter((opt) => opt !== "padding")
              );
            }}
          />
        )}
        {contentActive.includes("flexDirection") && (
          <BooleanConfig
            label="Content Flex Direction"
            opts={FlexDirOpts}
            value={flexDirection}
            setValue={setFlexDirection}
            onDelete={() => {
              setFlexDirection("row");
              setContentActive((prev) =>
                prev.filter((opt) => opt !== "flexDirection")
              );
            }}
          />
        )}
        {/* Name Wrapper Configs */}
        {nameActive.includes("namePadding") && (
          <PaddingConfig
            label="Name Padding"
            padding={namePadding}
            setPadding={setNamePadding}
            onDelete={() => {
              setNamePadding({
                top: 2,
                right: 2,
                bottom: 2,
                left: 2,
              }),
                setNameActive((prev) =>
                  prev.filter((opt) => opt !== "namePadding")
                );
            }}
          />
        )}
        {nameActive.includes("bgColor") && (
          <ColorSelector
            label="Name Background Color"
            inputValue={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            onDelete={() => {
              setBgColor("#ffffff");
              setNameActive((prev) => prev.filter((opt) => opt !== "bgColor"));
            }}
          />
        )}
        {nameActive.includes("nameFontSize") && (
          <FontSizeConfig
            label="Name Font Size"
            inputValue={nameFontSize}
            onChange={(e) => setNameFontSize(Number(e.target.value))}
            onDelete={() => {
              setNameFontSize(16);
              setNameActive((prev) =>
                prev.filter((opt) => opt !== "nameFontSize")
              );
            }}
          />
        )}
        {msgActive.includes("msgFontSize") && (
          <FontSizeConfig
            label="Message Font Size"
            inputValue={msgFontSize}
            onChange={(e) => setMsgFontSize(Number(e.target.value))}
            onDelete={() => {
              setMsgFontSize(16);
              setMsgActive((prev) =>
                prev.filter((opt) => opt !== "msgFontSize")
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
