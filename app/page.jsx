"use client";
import ViewerChat from "./_components/general-chats/viewer-chat";
import ModeratorChat from "./_components/general-chats/moderator-chat";
import ConfigSection from "./_components/element-tree/element-tree";
import ConfigWrapper from "./_components/config-panel/config-wrapper";
import useChatStyleConfig from "./hooks/useChatStyleConfig";
import Link from "next/link";

export default function Home() {
  const getStyle = (config, prefix) => ({
    backgroundColor: config.active.includes(`${prefix}BgColor`)
      ? config.bgColor
      : undefined,
    fontSize: config.fontSize,
    fontWeight: config.fontWeight,
    fontFamily: `'${config.fontFamily}'`,
    color: config.fontColor,
    lineHeight: config.lineHeight,
    textAlign: config.textAlign,
    padding: config.active.includes(`${prefix}Padding`)
      ? `${config.padding.top}px ${config.padding.right}px ${config.padding.bottom}px ${config.padding.left}px`
      : undefined,
  });

  const { generalConfig, updateGeneralConfig, roleConfigs, updateRoleConfig } =
    useChatStyleConfig();

  // Compose CSS output for all active configs
  let cssOutput = "";
  // const GeneralConfig = generalConfig;
  const viewerName = roleConfigs.viewer.name;
  const viewerMsg = roleConfigs.viewer.message;
  const modName = roleConfigs.moderator.name;
  const modMsg = roleConfigs.moderator.message;
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
    viewerName.active.includes("nameFontFamily") ||
    viewerName.active.includes("namePadding") ||
    viewerName.active.includes("nameBgColor")
  ) {
    cssOutput += `yt-live-chat-message-renderer #author-name {\n`;
    cssOutput += `  font-family: "${viewerName.fontFamily}" !important;\n`;
    cssOutput += `  color: ${viewerName.fontColor} !important;\n`;
    cssOutput += `  font-size: ${viewerName.fontSize}px !important;\n`;
    cssOutput += `  font-weight: ${viewerName.fontWeight}px !important;\n`;
    cssOutput += `  line-height: ${viewerName.lineHeight} !important;\n`;
    cssOutput += `  text-align: ${viewerName.textAlign} !important;\n`;
    if (viewerName.active.includes("namePadding")) {
      const p = viewerName.padding;
      cssOutput += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    if (viewerName.active.includes("nameBgColor")) {
      cssOutput += `  background-color: ${viewerName.nameBgColor} !important;\n`;
    }
    cssOutput += `}\n\n`;
  }

  //============= Viewer Message config =============
  if (
    viewerMsg.active.includes("msgFontFamily") ||
    viewerMsg.active.includes("msgPadding") ||
    viewerMsg.active.includes("msgBgColor")
  ) {
    cssOutput += `yt-live-chat-message-renderer #message {\n`;
    cssOutput += `  font-family: "${viewerMsg.fontFamily}" !important;\n`;
    cssOutput += `  color: ${viewerMsg.fontColor} !important;\n`;
    cssOutput += `  font-size: ${viewerMsg.fontSize}px !important;\n`;
    cssOutput += `  font-weight: ${viewerMsg.fontWeight}px !important;\n`;
    cssOutput += `  line-height: ${viewerMsg.lineHeight} !important;\n`;
    cssOutput += `  text-align: ${viewerMsg.textAlign} !important;\n`;

    if (viewerMsg.active.includes("msgPadding")) {
      const p = viewerMsg.padding;
      cssOutput += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    if (viewerMsg.active.includes("msgBgColor")) {
      cssOutput += `  background-color: ${viewerMsg.bgColor};\n`;
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
                  activeOptions: roleConfigs.viewer.name.active,
                  onAddOption: (opt) => {
                    const current = roleConfigs.viewer.name.active;
                    if (!current.includes(opt)) {
                      updateRoleConfig("viewer", "name", "active", [
                        ...current,
                        opt,
                      ]);
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
                  activeOptions: roleConfigs.viewer.message.active,
                  onAddOption: (opt) => {
                    const current = roleConfigs.viewer.message.active;
                    if (!current.includes(opt)) {
                      updateRoleConfig("viewer", "message", "active", [
                        ...current,
                        opt,
                      ]);
                    }
                  },
                },
              ]}
            />
            <ConfigSection
              title="Moderator Chat"
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
                    { label: "Background Color", value: "modNameBgColor" },
                    { label: "Font Family", value: "modNameFontFamily" },
                    { label: "Padding", value: "modNamePadding" },
                  ],
                  activeOptions: roleConfigs.moderator.name.active,
                  onAddOption: (opt) => {
                    const current = roleConfigs.moderator.name.active;
                    if (!current.includes(opt)) {
                      updateRoleConfig("moderator", "name", "active", [
                        ...current,
                        opt,
                      ]);
                    }
                  },
                },
                {
                  title: "Message",
                  options: [
                    { label: "Background Color", value: "modMsgBgColor" },
                    { label: "Font Family", value: "modMsgFontFamily" },
                    { label: "Padding", value: "modMsgPadding" },
                  ],
                  activeOptions: roleConfigs.moderator.message.active,
                  onAddOption: (opt) => {
                    const current = roleConfigs.moderator.message.active;
                    if (!current.includes(opt)) {
                      updateRoleConfig("moderator", "message", "active", [
                        ...current,
                        opt,
                      ]);
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
        <div className="flex flex-col p-4 h-full gap-4 justify-center mx-auto">
          <ViewerChat
            padding={generalConfig.padding}
            flexDirection={
              generalConfig.contentActive.includes("flexDirection")
                ? generalConfig.flexDirection
                : undefined
            }
            authorNameStyle={getStyle(roleConfigs.viewer.name, "name")}
            authorMsgStyle={getStyle(roleConfigs.viewer.message, "msg")}
          />
          <ModeratorChat
            padding={generalConfig.padding}
            flexDirection={
              generalConfig.contentActive.includes("flexDirection")
                ? generalConfig.flexDirection
                : undefined
            }
            authorNameStyle={getStyle(roleConfigs.moderator.name, "modName")}
            authorMsgStyle={getStyle(roleConfigs.moderator.message, "modMsg")}
          />
        </div>
        <ConfigWrapper
          generalConfig={generalConfig}
          updateGeneralConfig={updateGeneralConfig}
          roleConfigs={roleConfigs}
          updateRoleConfig={updateRoleConfig}
          cssOutput={cssOutput}
        />
      </div>
    </div>
  );
}
