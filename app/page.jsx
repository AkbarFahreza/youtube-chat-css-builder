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

function FlexDirectionConfig({ flexDirection, setFlexDirection }) {
  return (
    <div style={{ padding: 16 }}>
      <label>
        Flex Direction:&nbsp;
        <select
          value={flexDirection}
          onChange={(e) => setFlexDirection(e.target.value)}
        >
          <option value="row">row</option>
          <option value="column">column</option>
        </select>
      </label>
    </div>
  );
}

export default function Home() {
  // boolean options
  const FlexDirOpts = [
    { label: "row", value: "row" },
    { label: "column", value: "column" },
  ];
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
  // background color
  const [bgColor, setBgColor] = useState("#ffffff");
  // name config
  const [nameFontSize, setNameFontSize] = useState(16);
  const [namePadding, setNamePadding] = useState({
    top: 2,
    right: 2,
    bottom: 2,
    left: 2,
  });
  const [msgFontSize, setMsgFontSize] = useState(16);

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
    nameActive.includes("bgColor")
  ) {
    cssOutput += `yt-live-chat-message-renderer #author-name {\n`;

    if (nameActive.includes("nameFontSize")) {
      cssOutput += `  font-size: ${nameFontSize}px;\n`;
    }
    if (nameActive.includes("namePadding")) {
      cssOutput += `  padding: ${padding.top}px ${namePadding.right}px ${namePadding.bottom}px ${namePadding.left}px;\n`;
    }
    if (nameActive.includes("bgColor")) {
      cssOutput += `  background-color: ${bgColor};\n`;
    }
    cssOutput += `}\n\n`;
  }

  //============= Viewer Message config =============
  if (msgActive.includes("msgFontSize")) {
    cssOutput += `yt-live-chat-message-renderer #message {\n  font-size: ${msgFontSize}px;\n}\n\n`;
  }

  return (
    <div className="flex flex-col min-h-[100vh] max-h-[100vh] overflow-hidden">
      <div className="py-4 px-6 bg-gray-800/40 w-full">hai</div>
      <div className="grid grid-cols-[300px_minmax(500px,_1fr)_400px] gap-4 w-full">
        <div
          className="flex flex-col p-4 min-h-[100vh] rounded-lg shadow-sm border-r border-gray-800"
          id="element-tree"
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
                  { label: "Background Color", value: "bgColor" },
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
                options: [{ label: "Font Size", value: "msgFontSize" }],
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
              backgroundColor: nameActive.includes("bgColor")
                ? bgColor
                : undefined,
              fontSize: nameActive.includes("nameFontSize")
                ? `${nameFontSize}px`
                : undefined,
              padding: nameActive.includes("namePadding")
                ? `${namePadding.top}px ${namePadding.right}px ${namePadding.bottom}px ${namePadding.left}px`
                : undefined,
            }}
            authorMsgStyle={{
              fontSize: msgActive.includes("msgFontSize")
                ? `${msgFontSize}px`
                : undefined,
            }}
          />
        </div>
        <ConfigWrapper
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
          cssOutput={cssOutput}
        />
      </div>
    </div>
  );
}
