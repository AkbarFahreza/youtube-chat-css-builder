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
      className="max-w-[400px] bg-main flex-1 border-l pt-3 border-[#383838] px-3"
    >
      <div className="flex flex-row gap-1 pb-2">
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
    <div className="pr-3">
      <div
        className="py-3 border-b-white/20 border-b rounded-md flex flex-row justify-between items-center"
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
  config,
  updateRoleConfig,
  prefix,
}) {
  const deleteFont = () => {
    [
      ["fontFamily", "Inter"],
      ["fontColor", "#ffffff"],
      ["fontWeight", "400"],
      ["lineHeight", "normal"],
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

  return (
    <>
      {config.active.includes(`${prefix}BgColor`) && (
        <ColorSelector
          label="Background Color"
          inputValue={config.bgColor}
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
          label="Font"
          value={config}
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
          label="Padding"
          padding={config.padding}
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

  return (
    <div className="max-h-[90vh] overflow-y-scroll scrollbar">
      <Section
        title="Viewer Chat Config"
        collapsed={viewerCollapsed}
        setCollapsed={setViewerCollapsed}
      >
        <GeneralControls
          generalConfig={generalConfig}
          updateGeneralConfig={updateGeneralConfig}
        />
        <FontAndColorControls
          role="viewer"
          type="name"
          config={roleConfigs.viewer.name}
          updateRoleConfig={updateRoleConfig}
          prefix="name"
        />
        <FontAndColorControls
          role="viewer"
          type="message"
          config={roleConfigs.viewer.message}
          updateRoleConfig={updateRoleConfig}
          prefix="msg"
        />
      </Section>

      <Section
        title="Moderator Chat Config"
        collapsed={modCollapsed}
        setCollapsed={setModCollapsed}
      >
        <GeneralControls
          generalConfig={generalConfig}
          updateGeneralConfig={updateGeneralConfig}
        />
        <FontAndColorControls
          role="moderator"
          type="name"
          config={roleConfigs.moderator.name}
          updateRoleConfig={updateRoleConfig}
          prefix="modName"
        />
        <FontAndColorControls
          role="moderator"
          type="message"
          config={roleConfigs.moderator.message}
          updateRoleConfig={updateRoleConfig}
          prefix="modMsg"
        />
      </Section>
    </div>
  );
}
