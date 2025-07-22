"use client";
import PaddingConfig from "./padding-config";
// import { BooleanConfig, FontSizeConfig } from "./style-config";
import ColorSelector from "./color-selector";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CssOutput from "./css-output";
import { BooleanSelector } from "./boolean-selector";
import { FontSizeConfig } from "./font-size-config";
import FontEditor from "./font-config";

export default function ConfigWrapper({
  // viewer chat wrapper
  contentActive,
  setContentActive,
  padding,
  setPadding,
  flexDirection,
  setFlexDirection,
  // viewer Name config
  nameActive,
  setNameActive,
  nameFontFamily,
  setNameFontFamily,
  nameFontWeight,
  setNameFontWeight,
  nameLineHeight,
  setNameLineHeight,
  nameTextAlign,
  setNameTextAlign,
  nameBgColor,
  setNameBgColor,
  namePadding,
  setNamePadding,
  nameFontSize,
  setNameFontSize,
  // viewer Message config
  msgActive,
  setMsgActive,
  msgFontFamily,
  setMsgFontFamily,
  msgFontWeight,
  setMsgFontWeight,
  msgLineHeight,
  setMsgLineHeight,
  msgTextAlign,
  setMsgTextAlign,
  msgBgColor,
  setMsgBgColor,
  msgPadding,
  setMsgPadding,
  msgFontSize,
  setMsgFontSize,
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
          // Content Config
          contentActive={contentActive}
          setContentActive={setContentActive}
          padding={padding}
          setPadding={setPadding}
          flexDirection={flexDirection}
          setFlexDirection={setFlexDirection}
          //Viewer Name Config
          nameActive={nameActive}
          setNameActive={setNameActive}
          nameFontFamily={nameFontFamily}
          setNameFontFamily={setNameFontFamily}
          nameFontWeight={nameFontWeight}
          setNameFontWeight={setNameFontWeight}
          nameLineHeight={nameLineHeight}
          setNameLineHeight={setNameLineHeight}
          nameTextAlign={nameTextAlign}
          setNameTextAlign={setNameTextAlign}
          nameBgColor={nameBgColor}
          setNameBgColor={setNameBgColor}
          nameFontSize={nameFontSize}
          setNameFontSize={setNameFontSize}
          namePadding={namePadding}
          setNamePadding={setNamePadding}
          // Viewer Message C0nfig
          msgActive={msgActive}
          setMsgActive={setMsgActive}
          msgBgColor={msgBgColor}
          setMsgBgColor={setMsgBgColor}
          msgFontSize={msgFontSize}
          setMsgFontSize={setMsgFontSize}
          msgPadding={msgPadding}
          setMsgPadding={setMsgPadding}
          cssOutput={cssOutput}
          msgFontFamily={msgFontFamily}
          setMsgFontFamily={setMsgFontFamily}
          msgFontWeight={msgFontWeight}
          setMsgFontWeight={setMsgFontWeight}
          msgLineHeight={msgLineHeight}
          setMsgLineHeight={setMsgLineHeight}
          msgTextAlign={msgTextAlign}
          setMsgTextAlign={setMsgTextAlign}
        />
      ) : (
        <CssOutput cssOutput={cssOutput} />
      )}
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
  setNameActive,
  nameFontFamily,
  setNameFontFamily,
  nameFontWeight,
  setNameFontWeight,
  nameLineHeight,
  setNameLineHeight,
  nameTextAlign,
  setNameTextAlign,
  nameBgColor,
  setNameBgColor,
  namePadding,
  setNamePadding,
  nameFontSize,
  setNameFontSize,
  // viewer Message config
  msgActive,
  setMsgActive,
  msgFontFamily,
  setMsgFontFamily,
  msgFontWeight,
  setMsgFontWeight,
  msgLineHeight,
  setMsgLineHeight,
  msgTextAlign,
  setMsgTextAlign,
  msgBgColor,
  setMsgBgColor,
  msgPadding,
  setMsgPadding,
  msgFontSize,
  setMsgFontSize,
}) {
  const FlexDirOpts = [
    { label: "row", value: "row" },
    { label: "column", value: "column" },
  ];
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="max-h-[90vh] min-h-[90vh] pr-3 overflow-y-scroll scrollbar">
      <div
        className="py-3  border-b-secondary
        border-b rounded-md flex flex-row justify-between items-center"
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
          <BooleanSelector
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
        {nameActive.includes("nameBgColor") && (
          <ColorSelector
            label="Name Background Color"
            inputValue={nameBgColor}
            onChange={(e) => setNameBgColor(e.target.value)}
            onDelete={() => {
              setNameBgColor("#a819fe");
              setNameActive((prev) =>
                prev.filter((opt) => opt !== "nameBgColor")
              );
            }}
          />
        )}
        {nameActive.includes("nameFontFamily") && (
          <FontEditor
            label="Name Font"
            value={{
              fontFamily: nameFontFamily,
              fontWeight: nameFontWeight,
              lineHeight: nameLineHeight,
              textAlign: nameTextAlign,
              fontSize: nameFontSize,
            }}
            onChange={(val) => {
              console.log("FontEditor onChange", val);
              setNameFontFamily(val.fontFamily);
              setNameFontWeight(val.fontWeight);
              setNameLineHeight(val.lineHeight);
              setNameTextAlign(val.textAlign);
              setNameFontSize(val.fontSize);
            }}
            onDelete={() => {
              setNameFontFamily("Inter");
              setNameFontWeight("400");
              setNameLineHeight("normal");
              setNameTextAlign("left");
              setNameFontSize(16);
              setNameActive((prev) =>
                prev.filter((o) => o !== "nameFontFamily")
              );
            }}
          />
        )}
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
        {/* Message Configs */}
        {msgActive.includes("msgBgColor") && (
          <ColorSelector
            label="Message Background Color"
            inputValue={msgBgColor}
            onChange={(e) => setMsgBgColor(e.target.value)}
            onDelete={() => {
              setMsgBgColor("#a819fe");
              setMsgActive((prev) =>
                prev.filter((opt) => opt !== "msgBgColor")
              );
            }}
          />
        )}
        {msgActive.includes("msgFontSize") && (
          <FontSizeConfig
            label="Message Font Size"
            inputValue={msgFontSize}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/^0+(?=\d)/, "");
              e.target.value = cleaned;
              setMsgFontSize(Number(e.target.value));
            }}
            onDelete={() => {
              setMsgFontSize(16);
              setMsgActive((prev) =>
                prev.filter((opt) => opt !== "msgFontSize")
              );
            }}
          />
        )}
        {msgActive.includes("msgPadding") && (
          <PaddingConfig
            label="Message Padding"
            padding={msgPadding}
            setPadding={setMsgPadding}
            onDelete={() => {
              setMsgPadding({
                top: 2,
                right: 2,
                bottom: 2,
                left: 2,
              }),
                setMsgActive((prev) =>
                  prev.filter((opt) => opt !== "msgPadding")
                );
            }}
          />
        )}
      </div>
    </div>
  );
}
