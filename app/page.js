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
    top: 8,
    right: 8,
    bottom: 8,
    left: 8,
  });
  const [flexDirection, setFlexDirection] = useState("row");

  // Name wrapper section state
  const [nameActive, setNameActive] = useState([]);
  const [msgActive, setMsgActive] = useState([]);
  // background color
  const [bgColor, setBgColor] = useState("#ffffff");
  // Font sizing
  const [nameFontSize, setNameFontSize] = useState(16);
  const [msgFontSize, setMsgFontSize] = useState(16);

  // Compose CSS output for all active configs
  let cssOutput = "";
  if (contentActive.includes("padding")) {
    cssOutput += `yt-live-chat-message-renderer #content {\n  padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;\n}\n\n`;
  }
  if (contentActive.includes("flexDirection")) {
    cssOutput += `yt-live-chat-message-renderer #content {\n  display: flex;\n  flex-direction: ${flexDirection};\n}\n\n`;
  }
  if (nameActive.includes("bgColor")) {
    cssOutput += `yt-live-chat-message-renderer #author-name {\n  background-color: ${bgColor};\n}\n\n`;
  }
  if (nameActive.includes("nameFontSize")) {
    cssOutput += `yt-live-chat-message-renderer #author-name {\n  font-size: ${nameFontSize}px;\n}\n\n`;
  }
  if (msgActive.includes("msgFontSize")) {
    cssOutput += `yt-live-chat-message-renderer #message {\n  font-size: ${msgFontSize}px;\n}\n\n`;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput.trim());
    alert("CSS copied to clipboard!");
  };
  console.log(bgColor);
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
          <ConfigSection
            title="Moderator Chat"
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
