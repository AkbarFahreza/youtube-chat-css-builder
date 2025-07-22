"use client";
import { useState } from "react";
import ViewerChat from "./_components/general-chats/viewer-chat";
import ConfigSection from "./_components/element-tree/element-tree";
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
  const [nameFontFamily, setNameFontFamily] = useState("Inter");
  const [nameFontWeight, setNameFontWeight] = useState("400");
  const [nameLineHeight, setNameLineHeight] = useState("normal");
  const [nameTextAlign, setNameTextAlign] = useState("left");
  const [nameBgColor, setNameBgColor] = useState("#a819fe");
  const [nameFontSize, setNameFontSize] = useState(16);
  const [namePadding, setNamePadding] = useState({
    top: 2,
    right: 2,
    bottom: 2,
    left: 2,
  });

  // name config
  const [msgFontFamily, setMsgFontFamily] = useState("Inter");
  const [msgFontWeight, setMsgFontWeight] = useState("400");
  const [msgLineHeight, setMsgLineHeight] = useState("normal");
  const [msgTextAlign, setMsgTextAlign] = useState("left");
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
    if (nameActive.includes("nameFontWeight")) {
      cssOutput += `  font-weight: ${nameFontWeight};\n`;
    }
    if (nameActive.includes("nameFontFamily")) {
      cssOutput += `  font-family: '${nameFontFamily}', sans-serif;\n`;
    }
    if (nameActive.includes("nameLineHeight")) {
      cssOutput += `  line-height: ${nameLineHeight};\n`;
    }
    if (nameActive.includes("nameTextAlign")) {
      cssOutput += `  text-align: ${nameTextAlign};\n`;
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
    if (msgActive.includes("msgFontWeight")) {
      cssOutput += `  font-weight: ${msgFontWeight};\n`;
    }
    if (msgActive.includes("msgFontFamily")) {
      cssOutput += `  font-family: '${msgFontFamily}', sans-serif;\n`;
    }
    if (msgActive.includes("msgLineHeight")) {
      cssOutput += `  line-height: ${msgLineHeight};\n`;
    }
    if (msgActive.includes("msgTextAlign")) {
      cssOutput += `  text-align: ${msgTextAlign};\n`;
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
                  { label: "Font Family", value: "nameFontFamily" },
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
                  { label: "Font Family", value: "msgFontFamily" },
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
              fontSize: nameFontSize,
              fontWeight: nameFontWeight,
              fontFamily: `'${nameFontFamily}'`,
              lineHeight: nameLineHeight,
              textAlign: nameTextAlign,
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
              fontWeight: msgActive.includes("msgFontWeight")
                ? msgFontWeight
                : undefined,
              fontFamily: msgActive.includes("msgFontFamily")
                ? `'${msgFontFamily}', sans-serif !important`
                : undefined,
              lineHeight: msgActive.includes("msgLineHeight")
                ? msgLineHeight
                : undefined,
              textAlign: msgActive.includes("msgTextAlign")
                ? msgTextAlign
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
      </div>
    </div>
  );
}
