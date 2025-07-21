"use client";
import { useState } from "react";
import ViewerChat from "./_components/general-chats/viewer-chat";
import PaddingConfig from "./_components/config-panel/padding-config";
import ConfigSection from "./_components/element-tree/element-tree";
import CodeBlock from "./_components/code-bock";
import {
  BooleanConfig,
  FontSizeConfig,
} from "./_components/config-panel/style-config";
import ColorSelector from "./_components/config-panel/color-selector";
import ConfigWrapper from "./_components/config-panel/config-wrapper";

export default function Home() {
  // Content section state
  const [contentActive, setContentActive] = useState([]);
  const [padding, setPadding] = useState({
    top: 2,
    right: 2,
    bottom: 2,
    left: 2,
  });
  const [flexDirection, setFlexDirection] = useState("row");

  // Name wrapper section state
  const [nameActive, setNameActive] = useState([]);
  const [msgActive, setMsgActive] = useState([]);
  // name config
  const [nameBgColor, setNameBgColor] = useState("#a819fe");
  const [nameFontSize, setNameFontSize] = useState(16);
  const [namePadding, setNamePadding] = useState({
    top: 2,
    right: 2,
    bottom: 2,
    left: 2,
  });
  // name config
  const [msgBgColor, setMsgBgColor] = useState("#a819fe");
  const [msgFontSize, setMsgFontSize] = useState(16);
  const [msgPadding, setMsgPadding] = useState({
    top: 2,
    right: 2,
    bottom: 2,
    left: 2,
  });
  // Compose CSS output for all active configs
  let cssOutput = "";

  // =============================
  // Viewer config
  // =============================
  if (
    contentActive.includes("padding") ||
    contentActive.includes("flexDirection")
  ) {
    cssOutput += `yt-live-chat-message-renderer #content {\n`;
    if (contentActive.includes("padding")) {
      cssOutput += `  padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;\n`;
    }
    if (contentActive.includes("flexDirection")) {
      cssOutput += `  display: flex;\n  flex-direction: ${flexDirection};\n`;
    }
    cssOutput += `}\n\n`;
  }

  //============= Viewer Name config =============
  if (
    nameActive.includes("nameFontSize") ||
    nameActive.includes("namePadding") ||
    nameActive.includes("nameBgColor")
  ) {
    cssOutput += `yt-live-chat-message-renderer #author-name {\n`;

    if (nameActive.includes("nameFontSize")) {
      cssOutput += `  font-size: ${nameFontSize}px;\n`;
    }
    if (nameActive.includes("namePadding")) {
      cssOutput += `  padding: ${padding.top}px ${namePadding.right}px ${namePadding.bottom}px ${namePadding.left}px;\n`;
    }
    if (nameActive.includes("nameBgColor")) {
      cssOutput += `  background-color: ${nameBgColor};\n`;
    }
    cssOutput += `}\n\n`;
  }

  //============= Viewer Message config =============
  if (
    msgActive.includes("msgFontSize") ||
    msgActive.includes("msgPadding") ||
    msgActive.includes("msgBgColor")
  ) {
    cssOutput += `yt-live-chat-message-renderer #message {\n`;

    if (msgActive.includes("msgFontSize")) {
      cssOutput += `  font-size: ${msgFontSize}px;\n`;
    }
    if (msgActive.includes("msgPadding")) {
      cssOutput += `  padding: ${padding.top}px ${msgPadding.right}px ${msgPadding.bottom}px ${msgPadding.left}px;\n`;
    }
    if (msgActive.includes("msgBgColor")) {
      cssOutput += `  background-color: ${msgBgColor};\n`;
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
          <ConfigSection
            title="Viewer Chat"
            options={[
              { label: "Add Padding", value: "padding" },
              { label: "Flex Direction", value: "flexDirection" },
            ]}
            activeOptions={contentActive}
            onAddOption={(opt) =>
              setContentActive((prev) =>
                prev.includes(opt) ? prev : [...prev, opt]
              )
            }
            subSections={[
              {
                title: "Name",
                options: [
                  { label: "Background Color", value: "nameBgColor" },
                  { label: "Font Size", value: "nameFontSize" },
                  { label: "Padding", value: "namePadding" },
                ],
                activeOptions: nameActive,
                onAddOption: (opt) =>
                  setNameActive((prev) =>
                    prev.includes(opt) ? prev : [...prev, opt]
                  ),
              },
              {
                title: "Message",
                options: [
                  { label: "Background Color", value: "msgBgColor" },
                  { label: "Font Size", value: "msgFontSize" },
                  { label: "Padding", value: "msgPadding" },
                ],
                activeOptions: msgActive,
                onAddOption: (opt) =>
                  setMsgActive((prev) =>
                    prev.includes(opt) ? prev : [...prev, opt]
                  ),
              },
            ]}
          />
        </div>
        <div className="flex flex-col p-4 h-full justify-center items-center">
          <ViewerChat
            padding={padding}
            flexDirection={
              contentActive.includes("flexDirection")
                ? flexDirection
                : undefined
            }
            authorNameStyle={{
              backgroundColor: nameActive.includes("nameBgColor")
                ? nameBgColor
                : undefined,
              fontSize: nameActive.includes("nameFontSize")
                ? `${nameFontSize}px`
                : undefined,
              padding: nameActive.includes("namePadding")
                ? `${namePadding.top}px ${namePadding.right}px ${namePadding.bottom}px ${namePadding.left}px`
                : undefined,
            }}
            authorMsgStyle={{
              backgroundColor: msgActive.includes("msgBgColor")
                ? msgBgColor
                : undefined,
              fontSize: msgActive.includes("msgFontSize")
                ? `${msgFontSize}px`
                : undefined,
              padding: msgActive.includes("msgPadding")
                ? `${msgPadding.top}px ${msgPadding.right}px ${msgPadding.bottom}px ${msgPadding.left}px`
                : undefined,
            }}
          />
        </div>
        <ConfigWrapper
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
        />
      </div>
    </div>
  );
}
