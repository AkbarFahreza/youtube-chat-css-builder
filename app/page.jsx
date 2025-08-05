"use client";
import { useEffect } from "react";
import ViewerChat from "./_components/general-chats/viewer-chat";
import ModeratorChat from "./_components/general-chats/moderator-chat";
import ConfigSection from "./_components/element-tree/element-tree";
import ConfigWrapper from "./_components/config-panel/config-wrapper";
import useChatStyleConfig from "./hooks/useChatStyleConfig";
import Link from "next/link";
import MemberChat from "./_components/general-chats/member-chat";
import OwnerChat from "./_components/general-chats/owner-chat";

export default function Home() {
  const getStyle = (config, prefix) => ({
    backgroundColor: config.active.includes(`${prefix}BgColor`)
      ? config.bgColor
      : prefix === "owner"
      ? "#ffd600"
      : undefined,
    fontSize: config.fontSize,
    fontWeight: config.fontWeight,
    fontFamily: `'${config.fontFamily}'`,
    color: config.fontColor,
    lineHeight: config.lineHeight || "normal",
    textAlign: config.textAlign,
    padding: config.active.includes(`${prefix}Padding`)
      ? `${config.padding.top}px ${config.padding.right}px ${config.padding.bottom}px ${config.padding.left}px`
      : undefined,
    margin: config.active.includes(`${prefix}Margin`)
      ? `${config.margin.top}px ${config.margin.right}px ${config.margin.bottom}px ${config.margin.left}px`
      : undefined,
  });
  const getContentStyle = (config, prefix) => {
    return {
      backgroundColor: config.active.includes(`${prefix}BgColor`)
        ? config.contentBgColor
        : undefined,

      display: config.avatar || "block",
      flexDirection: config.flexDirection || "row",
      margin: config.active.includes(`${prefix}Margin`)
        ? `${config.margin.top}px ${config.margin.right}px ${config.margin.bottom}px ${config.margin.left}px`
        : undefined,
      padding: config.active.includes(`${prefix}Padding`)
        ? `${config.padding.top}px ${config.padding.right}px ${config.padding.bottom}px ${config.padding.left}px`
        : undefined,
    };
  };

  const { roleConfigs, updateRoleConfig } = useChatStyleConfig();

  return (
    <div className="flex flex-col min-h-[100vh] max-h-[100vh] overflow-hidden">
      <div className="grid grid-cols-[270px_minmax(500px,_1fr)_300px] gap-4 w-full">
        <div
          className="flex bg-main flex-col p-4 min-h-[99vh] rounded-lg shadow-sm border-r border-[#383838]"
          id="element-tree "
        >
          <div className="min-h-[90vh]">
            <ConfigSection
              title="Viewer Chat"
              options={[
                { label: "Flex Direction", value: "contentFlexDirection" },
                { label: "Avatar", value: "contentAvatar" },
                { label: "Content Margin", value: "contentMargin" },
                { label: "Content Padding", value: "contentPadding" },
              ]}
              activeOptions={roleConfigs.viewer.content.active}
              onAddOption={(opt) => {
                const current = roleConfigs.viewer.content.active;
                if (!current.includes(opt)) {
                  updateRoleConfig("viewer", "content", "active", [
                    ...current,
                    opt,
                  ]);
                }
              }}
              subSections={[
                {
                  title: "Name",
                  options: [
                    { label: "Background Color", value: "nameBgColor" },
                    { label: "Font Name", value: "nameFontFamily" },
                    { label: "Padding", value: "namePadding" },
                    { label: "Margin", value: "nameMargin" },
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
                    { label: "Font Message", value: "msgFontFamily" },
                    { label: "Padding", value: "msgPadding" },
                    { label: "Margin", value: "msgMargin" },
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
                { label: "Flex Direction", value: "modContentFlexDirection" },
                { label: "Avatar", value: "modContentAvatar" },
                { label: "Content Margin", value: "modContentMargin" },
                { label: "Content Padding", value: "modContentPadding" },
              ]}
              activeOptions={roleConfigs.moderator.content.active}
              onAddOption={(opt) => {
                const current = roleConfigs.moderator.content.active;
                if (!current.includes(opt)) {
                  updateRoleConfig("moderator", "content", "active", [
                    ...current,
                    opt,
                  ]);
                }
              }}
              subSections={[
                {
                  title: "Name",
                  options: [
                    { label: "Background Color", value: "modNameBgColor" },
                    { label: "Font Name", value: "modNameFontFamily" },
                    { label: "Padding", value: "modNamePadding" },
                    { label: "Margin", value: "modNameMargin" },
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
                    { label: "Font Name", value: "modMsgFontFamily" },
                    { label: "Padding", value: "modMsgPadding" },
                    { label: "Margin", value: "modMsgMargin" },
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
            <ConfigSection
              title="Member Chat"
              options={[
                {
                  label: "Flex Direction",
                  value: "memberContentFlexDirection",
                },
                { label: "Avatar", value: "memberContentAvatar" },
                { label: "Content Margin", value: "memberContentMargin" },
                { label: "Content Padding", value: "memberContentPadding" },
              ]}
              activeOptions={roleConfigs.member.content.active}
              onAddOption={(opt) => {
                console.log("member", roleConfigs.member.content.active);

                const current = roleConfigs.member.content.active;
                if (!current.includes(opt)) {
                  updateRoleConfig("member", "content", "active", [
                    ...current,
                    opt,
                  ]);
                }
              }}
              subSections={[
                {
                  title: "Name",
                  options: [
                    { label: "Background Color", value: "memberNameBgColor" },
                    { label: "Font Name", value: "memberNameFontFamily" },
                    { label: "Padding", value: "memberNamePadding" },
                    { label: "Margin", value: "memberNameMargin" },
                  ],
                  activeOptions: roleConfigs.member.name.active,
                  onAddOption: (opt) => {
                    const current = roleConfigs.member.name.active;
                    if (!current.includes(opt)) {
                      updateRoleConfig("member", "name", "active", [
                        ...current,
                        opt,
                      ]);
                    }
                  },
                },
                {
                  title: "Message",
                  options: [
                    { label: "Background Color", value: "memberMsgBgColor" },
                    { label: "Font Message", value: "memberMsgFontFamily" },
                    { label: "Padding", value: "memberMsgPadding" },
                    { label: "Margin", value: "memberMsgMargin" },
                  ],
                  activeOptions: roleConfigs.member.message.active,
                  onAddOption: (opt) => {
                    const current = roleConfigs.member.message.active;
                    if (!current.includes(opt)) {
                      updateRoleConfig("member", "message", "active", [
                        ...current,
                        opt,
                      ]);
                    }
                  },
                },
              ]}
            />
            <ConfigSection
              title="Owner Chat"
              options={[
                { label: "Flex Direction", value: "ownerContentFlexDirection" },
                { label: "Avatar", value: "ownerContentAvatar" },
                { label: "Content Margin", value: "ownerContentMargin" },
                { label: "Content Padding", value: "ownerContentPadding" },
              ]}
              activeOptions={roleConfigs.owner.content.active}
              onAddOption={(opt) => {
                console.log("owner", roleConfigs.owner.content.active);
                const current = roleConfigs.owner.content.active;
                if (!current.includes(opt)) {
                  updateRoleConfig("owner", "content", "active", [
                    ...current,

                    opt,
                  ]);
                }
              }}
              subSections={[
                {
                  title: "Name",
                  options: [
                    { label: "Background Color", value: "ownerNameBgColor" },
                    { label: "Font Name", value: "ownerNameFontFamily" },
                    { label: "Padding", value: "ownerNamePadding" },
                    { label: "Margin", value: "ownerNameMargin" },
                  ],
                  activeOptions: roleConfigs.owner.name.active,
                  onAddOption: (opt) => {
                    const current = roleConfigs.owner.name.active;
                    if (!current.includes(opt)) {
                      updateRoleConfig("owner", "name", "active", [
                        ...current,
                        opt,
                      ]);
                    }
                  },
                },
                {
                  title: "Message",
                  options: [
                    { label: "Background Color", value: "ownerMsgBgColor" },
                    { label: "Font Message", value: "ownerMsgFontFamily" },
                    { label: "Padding", value: "ownerMsgPadding" },
                    { label: "Margin", value: "ownerMsgMargin" },
                  ],
                  activeOptions: roleConfigs.owner.message.active,
                  onAddOption: (opt) => {
                    const current = roleConfigs.owner.message.active;
                    if (!current.includes(opt)) {
                      updateRoleConfig("owner", "message", "active", [
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
        <div className="flex flex-col justify-center relative">
          <h2 className="text-white fixed top-10 left-1/2 -translate-1/2 text-md px-4 py-2 bg-main  backdrop-blur-3xl rounded-full font-bold mb-6">
            Youtube Chat Builder <span>v0.0.1</span>
          </h2>
          <div className="flex flex-col p-4 h-full gap-4 justify-center px-10">
            <ViewerChat
              contentStyle={getContentStyle(
                roleConfigs.viewer.content,
                "content"
              )}
              authorNameStyle={getStyle(roleConfigs.viewer.name, "name")}
              authorMsgStyle={getStyle(roleConfigs.viewer.message, "msg")}
            />
            <ModeratorChat
              contentStyle={getContentStyle(
                roleConfigs.moderator.content,
                "modContent"
              )}
              authorNameStyle={getStyle(roleConfigs.moderator.name, "modName")}
              authorMsgStyle={getStyle(roleConfigs.moderator.message, "modMsg")}
            />
            <MemberChat
              contentStyle={getContentStyle(
                roleConfigs.member.content,
                "memberContent"
              )}
              authorNameStyle={getStyle(roleConfigs.member.name, "memberName")}
              authorMsgStyle={getStyle(roleConfigs.member.message, "memberMsg")}
            />
            <OwnerChat
              contentStyle={getContentStyle(
                roleConfigs.owner.content,
                "ownerContent"
              )}
              authorNameStyle={getStyle(roleConfigs.owner.name, "ownerName")}
              authorMsgStyle={getStyle(roleConfigs.owner.message, "ownerMsg")}
            />
          </div>
        </div>
        <ConfigWrapper
          roleConfigs={roleConfigs}
          updateRoleConfig={updateRoleConfig}
        />
      </div>
    </div>
  );
}
