"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PaddingConfig from "./config-editor/padding-config";
import ColorSelector from "./config-editor/color-selector";
import FontEditor from "./config-editor/font-config";
import { BooleanSelector } from "./config-editor/boolean-selector";
import CssOutput from "./css-output";

function formatLabel(text) {
  const withSpaces = text.replace(/([A-Z])/g, " $1").trim();
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}
export default function ConfigWrapper({
  roleConfigs,
  updateRoleConfig,
  cssOutput,
}) {
  const [mode, setMode] = useState("design");

  return (
    <div
      id="config-wrapper"
      className="max-w-[400px] bg-main flex-1 border-l pt-3 border-secondary "
    >
      <div className="flex flex-row gap-1 pb-2 px-3">
        {["design", "output"].map((m) => (
          <button
            key={m}
            className={`py-1 px-3 rounded-md hover:bg-[#383838] ${
              mode === m ? "bg-[#383838] text-white" : "text-white/55"
            }`}
            onClick={() => setMode(m)}
          >
            {m === "design" ? "Configure" : "Output Code"}
          </button>
        ))}
      </div>

      {mode === "design" ? (
        <ChatConfigPanel
          roleConfigs={roleConfigs}
          updateRoleConfig={updateRoleConfig}
        />
      ) : (
        <CssOutput cssOutput={cssOutput} />
      )}
    </div>
  );
}

function Section({ title, collapsed, setCollapsed, children }) {
  return (
    <div className="">
      <div
        className="py-3 px-3 border-b-white/20 border-b  flex flex-row justify-between items-center"
        onClick={() => setCollapsed(!collapsed)}
      >
        <p className="font-bold text-purple-500 text-base">{title}</p>
        <ChevronDown
          size={18}
          className={`${
            collapsed ? "-rotate-90" : ""
          } transition-all duration-200`}
        />
      </div>
      {!collapsed && children}
    </div>
  );
}

function FontAndColorControls({
  role,
  type,
  syncConfig,
  config,
  updateRoleConfig,
  prefix,
}) {
  const deleteFont = () => {
    const defaultColor =
      role === "moderator"
        ? "#4f7bff"
        : role === "member"
        ? "#2ba640"
        : role === "owner"
        ? "#000000"
        : "#ffffff";
    [
      ["fontFamily", "Inter"],
      ["fontColor", defaultColor],
      ["fontWeight", "400"],
      ["lineHeight", ""],
      ["textAlign", "left"],
      ["fontSize", 15],
    ].forEach(([key, val]) => updateRoleConfig(role, type, key, val));
    updateRoleConfig(
      role,
      type,
      "active",
      config.active.filter((o) => o !== `${prefix}FontFamily`)
    );
  };
  const FlexDirOpts = [
    { label: "Row", value: "row" },
    { label: "Column", value: "column" },
  ];
  const avatarDisplayOpts = [
    { label: "Show", value: "block" },
    { label: "Hide", value: "none" },
  ];
  return (
    <>
      {config.active.includes(`${prefix}FlexDirection`) && (
        <BooleanSelector
          label={formatLabel(`${prefix}Flex Direction`)}
          opts={FlexDirOpts}
          value={config.flexDirection}
          prefix={prefix}
          setSync={() => {
            updateRoleConfig(
              role,
              type,
              "flexDirection",
              syncConfig.flexDirection
            );
          }}
          setValue={(v) => updateRoleConfig(role, type, "flexDirection", v)}
          onDelete={() => {
            updateRoleConfig(role, type, "flexDirection", "row");
            updateRoleConfig(
              role,
              type,
              "active",
              config.active.filter((o) => o !== `${prefix}FlexDirection`)
            );
          }}
        />
      )}
      {config.active.includes(`${prefix}Avatar`) && (
        <BooleanSelector
          label={formatLabel(`${prefix}Avatar`)}
          opts={avatarDisplayOpts}
          value={config.avatar}
          prefix={prefix}
          setSync={() => {
            updateRoleConfig(role, type, "avatar", syncConfig.avatar);
          }}
          setValue={(v) => updateRoleConfig(role, type, "avatar", v)}
          onDelete={() => {
            updateRoleConfig(role, type, "avatar", "block");
            updateRoleConfig(
              role,
              type,
              "active",
              config.active.filter((o) => o !== `${prefix}Avatar`)
            );
          }}
        />
      )}

      {config.active.includes(`${prefix}BgColor`) && (
        <ColorSelector
          label={formatLabel(`${prefix}Background`)}
          inputValue={config.bgColor}
          prefix={prefix}
          setSync={() => {
            updateRoleConfig(role, type, "bgColor", syncConfig.bgColor);
          }}
          onChange={(e) =>
            updateRoleConfig(role, type, "bgColor", e.target.value)
          }
          onDelete={() => {
            updateRoleConfig(
              role,
              type,
              "bgColor",
              prefix === "owner" ? "#ffd600" : "#a819fe"
            );
            updateRoleConfig(
              role,
              type,
              "active",
              config.active.filter((o) => o !== `${prefix}BgColor`)
            );
          }}
        />
      )}

      {config.active.includes(`${prefix}FontFamily`) && (
        <FontEditor
          label={formatLabel(`${prefix} Font`)}
          value={config}
          setSync={() => {
            const keys = [
              "fontColor",
              "fontFamily",
              "fontSize",
              "fontWeight",
              "lineHeight",
            ];
            keys.forEach((key) => {
              updateRoleConfig(role, type, key, syncConfig[key]);
            });
          }}
          prefix={prefix}
          onChange={(val) => {
            Object.entries(val).forEach(([key, v]) =>
              updateRoleConfig(role, type, key, v)
            );
          }}
          onDelete={deleteFont}
        />
      )}

      {config.active.includes(`${prefix}Padding`) && (
        <PaddingConfig
          label={formatLabel(`${prefix} Padding`)}
          padding={config.padding}
          setSync={() => {
            updateRoleConfig(role, type, "padding", syncConfig.padding);
          }}
          prefix={prefix}
          setPadding={(partialPadding) =>
            updateRoleConfig(role, type, "padding", {
              ...config.padding,
              ...partialPadding,
            })
          }
          onDelete={() => {
            updateRoleConfig(role, type, "padding", defaultPadding);
            updateRoleConfig(
              role,
              type,
              "active",
              config.active.filter((opt) => opt !== `${prefix}Padding`)
            );
          }}
        />
      )}
    </>
  );
}

function ChatConfigPanel({ roleConfigs, updateRoleConfig }) {
  const [viewerCollapsed, setViewerCollapsed] = useState(false);
  const [modCollapsed, setModCollapsed] = useState(false);
  const [memberCollapsed, setMemberCollapsed] = useState(false);
  const [ownerCollapsed, setOwnerCollapsed] = useState(false);

  const hasViewerConfig =
    (roleConfigs.viewer?.content?.active?.length ?? 0) > 0 ||
    (roleConfigs.viewer?.name?.active?.length ?? 0) > 0 ||
    (roleConfigs.viewer?.message?.active?.length ?? 0) > 0;

  const hasModConfig =
    (roleConfigs.moderator?.content?.active?.length ?? 0) > 0 ||
    (roleConfigs.moderator?.name?.active?.length ?? 0) > 0 ||
    (roleConfigs.moderator?.message?.active?.length ?? 0) > 0;

  const hasMemberConfig =
    (roleConfigs.member?.content?.active?.length ?? 0) > 0 ||
    (roleConfigs.member?.name?.active?.length ?? 0) > 0 ||
    (roleConfigs.member?.message?.active?.length ?? 0) > 0;

  const hasOwnerConfig =
    (roleConfigs.owner?.content?.active?.length ?? 0) > 0 ||
    (roleConfigs.owner?.name?.active?.length ?? 0) > 0 ||
    (roleConfigs.owner?.message?.active?.length ?? 0) > 0;

  return (
    <div className="max-h-[90vh] overflow-y-scroll scrollbar">
      {hasViewerConfig && (
        <Section
          title="Viewer Chat Config"
          collapsed={viewerCollapsed}
          setCollapsed={setViewerCollapsed}
        >
          {(roleConfigs.viewer?.content?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="viewer"
              type="content"
              config={roleConfigs.viewer.content}
              updateRoleConfig={updateRoleConfig}
              prefix="content"
            />
          )}

          {(roleConfigs.viewer?.name?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="viewer"
              type="name"
              config={roleConfigs.viewer.name}
              updateRoleConfig={updateRoleConfig}
              prefix="name"
            />
          )}
          {(roleConfigs.viewer?.message?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="viewer"
              type="message"
              config={roleConfigs.viewer.message}
              updateRoleConfig={updateRoleConfig}
              prefix="msg"
            />
          )}
        </Section>
      )}

      {hasModConfig && (
        <Section
          title="Moderator Chat Config"
          collapsed={modCollapsed}
          setCollapsed={setModCollapsed}
        >
          {(roleConfigs.moderator?.content?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="moderator"
              type="content"
              syncConfig={roleConfigs.viewer.content}
              config={roleConfigs.moderator.content}
              updateRoleConfig={updateRoleConfig}
              prefix="modContent"
            />
          )}
          {(roleConfigs.moderator?.name?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="moderator"
              type="name"
              syncConfig={roleConfigs.viewer.name}
              config={roleConfigs.moderator.name}
              updateRoleConfig={updateRoleConfig}
              prefix="modName"
            />
          )}
          {(roleConfigs.moderator?.message?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="moderator"
              type="message"
              syncConfig={roleConfigs.viewer.message}
              config={roleConfigs.moderator.message}
              updateRoleConfig={updateRoleConfig}
              prefix="modMsg"
            />
          )}
        </Section>
      )}
      {hasMemberConfig && (
        <Section
          title="Member Chat Config"
          collapsed={memberCollapsed}
          setCollapsed={setMemberCollapsed}
        >
          {(roleConfigs.member?.content?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="member"
              type="content"
              syncConfig={roleConfigs.viewer.content}
              config={roleConfigs.member.content}
              updateRoleConfig={updateRoleConfig}
              prefix="memberContent"
            />
          )}
          {(roleConfigs.member?.name?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="member"
              type="name"
              syncConfig={roleConfigs.viewer.name}
              config={roleConfigs.member.name}
              updateRoleConfig={updateRoleConfig}
              prefix="memberName"
            />
          )}
          {(roleConfigs.member?.message?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="member"
              type="message"
              syncConfig={roleConfigs.viewer.message}
              config={roleConfigs.member.message}
              updateRoleConfig={updateRoleConfig}
              prefix="memberMsg"
            />
          )}
        </Section>
      )}
      {hasOwnerConfig && (
        <Section
          title="Owner Chat Config"
          collapsed={ownerCollapsed}
          setCollapsed={setOwnerCollapsed}
        >
          {(roleConfigs.owner?.content?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="owner"
              type="content"
              syncConfig={roleConfigs.viewer.content}
              config={roleConfigs.owner.content}
              updateRoleConfig={updateRoleConfig}
              prefix="ownerContent"
            />
          )}
          {(roleConfigs.owner?.name?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="owner"
              type="name"
              syncConfig={roleConfigs.viewer.name}
              config={roleConfigs.owner.name}
              updateRoleConfig={updateRoleConfig}
              prefix="ownerName"
            />
          )}
          {(roleConfigs.owner?.message?.active?.length ?? 0) > 0 && (
            <FontAndColorControls
              role="owner"
              type="message"
              syncConfig={roleConfigs.viewer.message}
              config={roleConfigs.owner.message}
              updateRoleConfig={updateRoleConfig}
              prefix="ownerMsg"
            />
          )}
        </Section>
      )}

      {/* Show fallback if nothing is active */}
      {!hasViewerConfig && !hasModConfig && !hasMemberConfig && (
        <div className="px-5 flex flex-col justify-center items-center h-[90vh]">
          <div className="text-white/40 mx-auto text-sm text-center py-4 leading-snug whitespace-pre">
            {` ╱|、
(˚ˎ 。7  
         |、˜〵          
  じしˍ,)ノ`}
          </div>
          <p className="text-white/40 mx-auto text-sm text-center">
            No configs were added, try to add from left panel
          </p>
        </div>
      )}
    </div>
  );
}
