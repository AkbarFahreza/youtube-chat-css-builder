import React from "react";
import CodeBlock from "../code-bock";

export default function CssOutput({ roleConfigs }) {
  const viewer = roleConfigs.viewer;
  const moderator = roleConfigs.moderator;

  let cssOutput = "";

  // === Helper to generate padding string ===
  const getPaddingString = (p) =>
    `${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`;

  // === Google Font Import ===
  if (viewer.name.active.includes("nameFontFamily")) {
    const fontFamilyParam = viewer.name.fontFamily?.replace(/ /g, "+");
    const fontWeightParam = viewer.name.fontWeight || "400";
    cssOutput += `@import url('https://fonts.googleapis.com/css2?family=${fontFamilyParam}:wght@${fontWeightParam}&display=swap');\n\n`;
  }

  // === Viewer Content Style ===
  if (viewer.content.active.includes("contentFlexDirection")) {
    cssOutput += `yt-live-chat-text-message-renderer #content {\n`;
    cssOutput += `  flex-direction: ${viewer.content.flexDirection} !important;\n`;
    cssOutput += `}\n\n`;
  }

  if (viewer.content.active.includes("contentAvatar")) {
    cssOutput += `yt-live-chat-text-message-renderer #author-photo {\n`;
    cssOutput += `  display: ${viewer.content.avatar} !important;\n`;
    cssOutput += `}\n\n`;
  }

  // === Moderator Content Style ===
  if (moderator.content.active.includes("modContentFlexDirection")) {
    cssOutput += `yt-live-chat-text-message-renderer[type="moderator"] #content {\n`;
    cssOutput += `  flex-direction: ${moderator.content.flexDirection} !important;\n`;
    cssOutput += `}\n\n`;
  }

  if (moderator.content.active.includes("modContentAvatar")) {
    cssOutput += `yt-live-chat-text-message-renderer[type="moderator"] #author-photo {\n`;
    cssOutput += `  display: ${moderator.content.avatar} !important;\n`;
    cssOutput += `}\n\n`;
  }

  // === Viewer Name Style ===
  const viewerNameActive = viewer.name.active;
  if (
    viewerNameActive.includes("nameFontFamily") ||
    viewerNameActive.includes("namePadding") ||
    viewerNameActive.includes("nameBgColor")
  ) {
    cssOutput += `yt-live-chat-text-message-renderer #author-name {\n`;
    cssOutput += `  font-family: "${viewer.name.fontFamily}" !important;\n`;
    cssOutput += `  color: ${viewer.name.fontColor} !important;\n`;
    cssOutput += `  font-size: ${viewer.name.fontSize}px !important;\n`;
    cssOutput += `  font-weight: ${viewer.name.fontWeight}px !important;\n`;
    cssOutput += `  line-height: ${viewer.name.lineHeight} !important;\n`;
    cssOutput += `  text-align: ${viewer.name.textAlign} !important;\n`;

    if (viewerNameActive.includes("namePadding")) {
      cssOutput += `  padding: ${getPaddingString(
        viewer.name.padding
      )} !important;\n`;
    }

    if (viewerNameActive.includes("nameBgColor")) {
      cssOutput += `  background-color: ${viewer.name.nameBgColor} !important;\n`;
    }

    cssOutput += `}\n\n`;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput.trim());
    alert("CSS copied to clipboard!");
  };

  return (
    <div className="px-3">
      <div className="flex flex-row justify-between items-center py-2">
        <h4 className="text-white font-semibold">CSS Output:</h4>
        <button
          onClick={copyToClipboard}
          className="text-purple-500 bg-purple-800/25 border border-purple-500 hover:bg-purple-800/60 cursor-pointer transition-all duration-200 rounded-lg px-4 py-1"
        >
          Copy CSS
        </button>
      </div>
      <CodeBlock
        code={cssOutput.trim() || "/* No CSS config is active */"}
        language="css"
      />
    </div>
  );
}
