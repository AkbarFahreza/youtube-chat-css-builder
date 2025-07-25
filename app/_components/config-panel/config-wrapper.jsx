"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PaddingConfig from "./config-editor/padding-config";
import ColorSelector from "./config-editor/color-selector";
import FontEditor from "./config-editor/font-config";
import { BooleanSelector } from "./config-editor/boolean-selector";
import CssOutput from "./css-output";

const defaultPadding = { top: 2, right: 2, bottom: 2, left: 2 };
const FlexDirOpts = [
  { label: "row", value: "row" },
  { label: "column", value: "column" },
];
function formatLabel(text) {
  const withSpaces = text.replace(/([A-Z])/g, " $1").trim();
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}
export default function ConfigWrapper({
  generalConfig,
  updateGeneralConfig,
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
          generalConfig={generalConfig}
          updateGeneralConfig={updateGeneralConfig}
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
    [
      ["fontFamily", "Inter"],
      ["fontColor", "#ffffff"],
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

  console.log;

  return (
    <>
      {config.active.includes(`${prefix}BgColor`) && (
        <ColorSelector
          label={formatLabel(`${prefix}Background Color`)}
          inputValue={config.bgColor}
          prefix={prefix}
          setSync={() => {
            updateRoleConfig(role, type, "bgColor", syncConfig.bgColor);
          }}
          onChange={(e) =>
            updateRoleConfig(role, type, "bgColor", e.target.value)
          }
          onDelete={() => {
            updateRoleConfig(role, type, "bgColor", "#a819fe");
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
          setPadding={(p) => updateRoleConfig(role, type, "padding", p)}
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

function GeneralControls({ generalConfig, updateGeneralConfig }) {
  return (
    <>
      {generalConfig.contentActive.includes("padding") && (
        <PaddingConfig
          label="Content Padding"
          padding={generalConfig.padding}
          setPadding={(p) => updateGeneralConfig("padding", p)}
          onDelete={() => {
            updateGeneralConfig("padding", defaultPadding);
            updateGeneralConfig(
              "contentActive",
              generalConfig.contentActive.filter((opt) => opt !== "padding")
            );
          }}
        />
      )}

      {generalConfig.contentActive.includes("flexDirection") && (
        <BooleanSelector
          label="Content Flex Direction"
          opts={FlexDirOpts}
          value={generalConfig.flexDirection}
          setValue={(v) => updateGeneralConfig("flexDirection", v)}
          onDelete={() => {
            updateGeneralConfig("flexDirection", "row");
            updateGeneralConfig(
              "contentActive",
              generalConfig.contentActive.filter(
                (opt) => opt !== "flexDirection"
              )
            );
          }}
        />
      )}
    </>
  );
}
function ChatConfigPanel({
  generalConfig,
  updateGeneralConfig,
  roleConfigs,
  updateRoleConfig,
}) {
  const [viewerCollapsed, setViewerCollapsed] = useState(false);
  const [modCollapsed, setModCollapsed] = useState(false);

  const hasViewerConfig =
    (generalConfig?.contentActive?.length ?? 0) > 0 ||
    (roleConfigs.viewer?.name?.active?.length ?? 0) > 0 ||
    (roleConfigs.viewer?.message?.active?.length ?? 0) > 0;

  const hasModConfig =
    (roleConfigs.moderator?.name?.active?.length ?? 0) > 0 ||
    (roleConfigs.moderator?.message?.active?.length ?? 0) > 0;

  return (
    <div className="max-h-[90vh] overflow-y-scroll scrollbar">
      {hasViewerConfig && (
        <Section
          title="Viewer Chat Config"
          collapsed={viewerCollapsed}
          setCollapsed={setViewerCollapsed}
        >
          {generalConfig?.contentActive?.length > 0 && (
            <GeneralControls
              generalConfig={generalConfig}
              updateGeneralConfig={updateGeneralConfig}
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
              syncConfig={roleConfigs.viewer.name}
              config={roleConfigs.moderator.message}
              updateRoleConfig={updateRoleConfig}
              prefix="modMsg"
            />
          )}
        </Section>
      )}

      {/* Show fallback if nothing is active */}
      {!hasViewerConfig && !hasModConfig && (
        <div className="px-5 flex flex-col justify-center items-center h-[90vh]">
          <div className="text-white/40 mx-auto text-sm text-center py-4 leading-snug whitespace-pre">
            {` ╱|、
(˚ˎ 。7  
         |、˜〵          
  じしˍ,)ノ`}
          </div>
          <p className="text-white/40 mx-auto text-sm text-center">
            No configs were added,, try to add from efft panel
          </p>
        </div>
      )}
    </div>
  );
}
