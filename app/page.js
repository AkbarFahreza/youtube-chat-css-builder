"use client";
import { useState } from "react";
import ViewerChat from "./_components/general-chats/viewer-chat";
import ViewerChatConfig from "./_components/config-panel/viewer-chat-config";
import ConfigSection from "./_components/chat-elements/config-section";
import CodeBlock from "./_components/code-bock";

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

function BgColorConfig({ bgColor, setBgColor }) {
  return (
    <div style={{ padding: 16 }}>
      <label>
        Background Color:&nbsp;
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </label>
    </div>
  );
}

export default function Home() {
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
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(16);

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
  if (nameActive.includes("fontSize")) {
    cssOutput += `yt-live-chat-message-renderer #author-name {\n  font-size: ${fontSize}px;\n}\n\n`;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput.trim());
    alert("CSS copied to clipboard!");
  };

  return (
    <div className="grid grid-cols-[300px_minmax(500px,_1fr)_390px] gap-4 w-full">
      <div
        className="flex flex-col p-4 h-[100vh] rounded-lg shadow-sm border-r border-gray-800"
        id="chat-elements"
      >
        <ConfigSection
          title="Content"
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
              title: "Name Wrapper",
              options: [
                { label: "Background Color", value: "bgColor" },
                { label: "Font Size", value: "fontSize" },
              ],
              activeOptions: nameActive,
              onAddOption: (opt) =>
                setNameActive((prev) =>
                  prev.includes(opt) ? prev : [...prev, opt]
                ),
            },
          ]}
        />
      </div>
      <div className="flex flex-col p-4 h-[100vh] justify-center items-center">
        <ViewerChat
          padding={padding}
          flexDirection={
            contentActive.includes("flexDirection") ? flexDirection : undefined
          }
          authorNameStyle={{
            backgroundColor: nameActive.includes("bgColor")
              ? bgColor
              : undefined,
            fontSize: nameActive.includes("fontSize")
              ? `${fontSize}px`
              : undefined,
          }}
        />
      </div>
      <div className=" flex-1 border-l border-gray-700 px-6" id="chat-config">
        {/* Content Configs */}
        {contentActive.includes("padding") && (
          <ViewerChatConfig padding={padding} setPadding={setPadding} />
        )}
        {contentActive.includes("flexDirection") && (
          <FlexDirectionConfig
            flexDirection={flexDirection}
            setFlexDirection={setFlexDirection}
          />
        )}
        {/* Name Wrapper Configs */}
        {nameActive.includes("bgColor") && (
          <BgColorConfig bgColor={bgColor} setBgColor={setBgColor} />
        )}
        {nameActive.includes("fontSize") && (
          <div style={{ padding: 16 }}>
            <label>
              Font Size:&nbsp;
              <input
                type="number"
                value={fontSize}
                min={8}
                max={48}
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{ width: 60 }}
              />
              px
            </label>
          </div>
        )}
        <div style={{ marginTop: 24 }}>
          <h4 className="text-white font-semibold mb-2">CSS Output:</h4>
          <CodeBlock code={cssOutput.trim()} language="css" />
          <button
            onClick={copyToClipboard}
            className="text-purple-500 bg-purple-800/25 border border-purple-500 hover:bg-purple-800/60 cursor-pointer transition-all duration-200 rounded-lg px-4 py-2 mt-6"
          >
            Copy CSS
          </button>
        </div>
      </div>
    </div>
  );
}
