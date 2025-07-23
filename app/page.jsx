"use client";
import { useState } from "react";
import ViewerChat from "./_components/general-chats/viewer-chat";
import ConfigSection from "./_components/element-tree/element-tree";
import ConfigWrapper from "./_components/config-panel/config-wrapper";
import useChatStyleConfig from "./hooks/useChatStyleConfig";
import Link from "next/link";

export default function Home() {
  const {
    generalConfig,
    updateGeneralConfig,
    nameConfig,
    updateMsgConfig,
    msgConfig,
    updateNameConfig,
  } = useChatStyleConfig();
  // Compose CSS output for all active configs
  let cssOutput = "";

  // =============================
  // Viewer config
  // =============================
  if (
    generalConfig.contentActive.includes("padding") ||
    generalConfig.contentActive.includes("flexDirection")
  ) {
    cssOutput += `yt-live-chat-message-renderer #content {\n`;
    if (generalConfig.contentActive.includes("padding")) {
      const p = generalConfig.padding;
      cssOutput += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px;\n`;
    }
    if (generalConfig.contentActive.includes("flexDirection")) {
      cssOutput += `  display: flex;\n  flex-direction: ${generalConfig.flexDirection};\n`;
    }
    cssOutput += `}\n\n`;
  }

  //============= Viewer Name config =============
  if (
    nameConfig.active.includes("nameFontFamily") ||
    nameConfig.active.includes("namePadding") ||
    nameConfig.active.includes("nameBgColor")
  ) {
    cssOutput += `yt-live-chat-message-renderer #author-name {\n`;
    cssOutput += `  font-family: "${nameConfig.fontFamily}" !important;\n`;
    cssOutput += `  color: ${nameConfig.fontColor} !important;\n`;
    cssOutput += `  font-size: ${nameConfig.fontSize}px !important;\n`;
    cssOutput += `  font-weight: ${nameConfig.fontWeight}px !important;\n`;
    cssOutput += `  line-height: ${nameConfig.lineHeight} !important;\n`;
    cssOutput += `  text-align: ${nameConfig.textAlign} !important;\n`;
    if (nameConfig.active.includes("namePadding")) {
      const p = nameConfig.padding;
      cssOutput += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    if (nameConfig.active.includes("nameBgColor")) {
      cssOutput += `  background-color: ${nameConfig.nameBgColor} !important;\n`;
    }
    cssOutput += `}\n\n`;
  }

  //============= Viewer Message config =============
  if (
    msgConfig.active.includes("msgFontFamily") ||
    msgConfig.active.includes("msgPadding") ||
    msgConfig.active.includes("msgBgColor")
  ) {
    cssOutput += `yt-live-chat-message-renderer #message {\n`;
    cssOutput += `  font-family: "${msgConfig.fontFamily}" !important;\n`;
    cssOutput += `  color: ${msgConfig.fontColor} !important;\n`;
    cssOutput += `  font-size: ${msgConfig.fontSize}px !important;\n`;
    cssOutput += `  font-weight: ${msgConfig.fontWeight}px !important;\n`;
    cssOutput += `  line-height: ${msgConfig.lineHeight} !important;\n`;
    cssOutput += `  text-align: ${msgConfig.textAlign} !important;\n`;

    if (msgConfig.active.includes("msgPadding")) {
      const p = msgConfig.padding;
      cssOutput += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    if (msgConfig.active.includes("msgBgColor")) {
      cssOutput += `  background-color: ${msgConfig.bgColor};\n`;
    }
    cssOutput += `}\n\n`;
  }

  return (
    <div className="flex flex-col min-h-[100vh] max-h-[100vh] overflow-hidden">
      {/* <div className="py-2 px-6 bg-[#383838] w-full flex flex-row justify-between">
        <h1 className="text-base font-bold text-white">
          Youtube Chat CSS Builder
        </h1>
      </div> */}
      <div className="grid grid-cols-[230px_minmax(500px,_1fr)_300px] gap-4 w-full">
        <div
          className="flex bg-main flex-col p-4 min-h-[100vh] rounded-lg shadow-sm border-r border-[#383838]"
          id="element-tree "
        >
          <div className="min-h-[90vh]">
            <ConfigSection
              title="Viewer Chat"
              options={[
                { label: "Add Padding", value: "padding" },
                { label: "Flex Direction", value: "flexDirection" },
              ]}
              activeOptions={generalConfig.contentActive}
              onAddOption={(opt) => {
                if (!generalConfig.contentActive.includes(opt)) {
                  updateGeneralConfig("contentActive", [
                    ...generalConfig.contentActive,
                    opt,
                  ]);
                }
              }}
              subSections={[
                {
                  title: "Name",
                  options: [
                    { label: "Background Color", value: "nameBgColor" },
                    { label: "Font Family", value: "nameFontFamily" },
                    { label: "Padding", value: "namePadding" },
                  ],
                  activeOptions: nameConfig.active,
                  onAddOption: (opt) => {
                    if (!nameConfig.active.includes(opt)) {
                      updateNameConfig("active", [...nameConfig.active, opt]);
                    }
                  },
                },
                {
                  title: "Message",
                  options: [
                    { label: "Background Color", value: "msgBgColor" },
                    { label: "Font Family", value: "msgFontFamily" },
                    { label: "Padding", value: "msgPadding" },
                  ],
                  activeOptions: msgConfig.active,
                  onAddOption: (opt) => {
                    if (!msgConfig.active.includes(opt)) {
                      updateMsgConfig("active", [...msgConfig.active, opt]);
                    }
                  },
                },
              ]}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-[10px]">Developed By :</p>
            <Link
              href="https://x.com/Revernry"
              className="hover:text-purple-500 transition-all duration-200 font-bold text-base"
            >
              DekReza
            </Link>
          </div>
        </div>
        <div className="flex flex-col p-4 h-full justify-center items-center">
          <ViewerChat
            padding={generalConfig.padding}
            flexDirection={
              generalConfig.contentActive.includes("flexDirection")
                ? generalConfig.flexDirection
                : undefined
            }
            authorNameStyle={{
              backgroundColor: nameConfig.active.includes("nameBgColor")
                ? nameConfig.bgColor
                : undefined,
              fontSize: nameConfig.fontSize,
              fontWeight: nameConfig.fontWeight,
              fontFamily: `'${nameConfig.fontFamily}'`,
              color: nameConfig.fontColor,
              lineHeight: nameConfig.lineHeight,
              textAlign: nameConfig.textAlign,
              padding: nameConfig.active.includes("namePadding")
                ? `${nameConfig.padding.top}px ${nameConfig.padding.right}px ${nameConfig.padding.bottom}px ${nameConfig.padding.left}px`
                : undefined,
            }}
            authorMsgStyle={{
              backgroundColor: msgConfig.active.includes("msgBgColor")
                ? msgConfig.bgColor
                : undefined,
              fontSize: msgConfig.fontSize,
              fontWeight: msgConfig.fontWeight,
              fontFamily: `'${msgConfig.fontFamily}'`,
              color: msgConfig.fontColor,
              lineHeight: msgConfig.lineHeight,
              textAlign: msgConfig.textAlign,
              padding: msgConfig.active.includes("msgPadding")
                ? `${msgConfig.padding.top}px ${msgConfig.padding.right}px ${msgConfig.padding.bottom}px ${msgConfig.padding.left}px`
                : undefined,
            }}
          />
        </div>
        <ConfigWrapper
          generalConfig={generalConfig}
          updateGeneralConfig={updateGeneralConfig}
          nameConfig={nameConfig}
          updateNameConfig={updateNameConfig}
          msgConfig={msgConfig}
          updateMsgConfig={updateMsgConfig}
          cssOutput={cssOutput}
        />
      </div>
    </div>
  );
}
