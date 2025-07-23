"use client";
import { useState } from "react";
import ViewerChat from "./_components/general-chats/viewer-chat";
import ConfigSection from "./_components/element-tree/element-tree";
import ConfigWrapper from "./_components/config-panel/config-wrapper";
import Link from "next/link";

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
  const [nameFontColor, setNameFontColor] = useState("#ffffff");
  const [nameFontWeight, setNameFontWeight] = useState("400");
  const [nameLineHeight, setNameLineHeight] = useState("normal");
  const [nameTextAlign, setNameTextAlign] = useState("left");
  const [nameBgColor, setNameBgColor] = useState("#a819fe");
  const [nameFontSize, setNameFontSize] = useState(15);
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
  const [msgFontSize, setMsgFontSize] = useState(15);
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
    nameActive.includes("nameFontFamily") ||
    nameActive.includes("namePadding") ||
    nameActive.includes("nameBgColor")
  ) {
    cssOutput += `yt-live-chat-message-renderer #author-name {\n`;
    cssOutput += `  font-family: "${nameFontFamily}" !important;\n`;
    cssOutput += `  color: ${nameFontColor} !important;\n`;
    cssOutput += `  font-size: ${nameFontSize}px !important;\n`;
    cssOutput += `  font-weight: ${nameFontWeight}px !important;\n`;
    cssOutput += `  line-height: ${nameLineHeight} !important;\n`;
    cssOutput += `  text-align: ${nameTextAlign} !important;\n`;
    if (nameActive.includes("namePadding")) {
      cssOutput += `  padding: ${padding.top}px ${namePadding.right}px ${namePadding.bottom}px ${namePadding.left}px !important;\n`;
    }
    if (nameActive.includes("nameBgColor")) {
      cssOutput += `  background-color: ${nameBgColor} !important;\n`;
    }
    cssOutput += `}\n\n`;
  }

  //============= Viewer Message config =============
  if (
    msgActive.includes("msgFontFamily") ||
    msgActive.includes("msgPadding") ||
    msgActive.includes("msgBgColor")
  ) {
    cssOutput += `yt-live-chat-message-renderer #message {\n`;
    cssOutput += `  font-family: "${msgFontFamily}" !important;\n`;
    cssOutput += `  font-size: ${msgFontSize}px !important;\n`;
    cssOutput += `  font-weight: ${msgFontWeight}px !important;\n`;
    cssOutput += `  line-height: ${msgLineHeight} !important;\n`;
    cssOutput += `  text-align: ${msgTextAlign} !important;\n`;

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
          <div className="min-h-[90vh]">
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
              color: nameFontColor,
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
              fontSize: msgFontSize,
              fontWeight: msgFontWeight,
              fontFamily: `'${msgFontFamily}'`,
              lineHeight: msgLineHeight,
              textAlign: msgTextAlign,
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
          nameFontColor={nameFontColor}
          setNameFontColor={setNameFontColor}
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
