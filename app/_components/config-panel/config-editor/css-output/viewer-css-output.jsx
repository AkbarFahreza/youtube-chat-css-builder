// viewer-chat-css-output.jsx

export const ViewerCss = (viewer) => {
  let css = "";
  const getPaddingString = (p) =>
    `${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`;

  const contentActive = viewer?.content?.active || [];
  const nameActive = viewer?.name?.active || [];
  const msgActive = viewer?.message?.active || [];

  // === Google Font Import ===
  if (viewer.name.active.includes("nameFontFamily")) {
    const fontFamilyParam = viewer.name.fontFamily?.replace(/ /g, "+");
    const fontWeightParam = viewer.name.fontWeight || "400";
    css += `@import url('https://fonts.googleapis.com/css2?family=${fontFamilyParam}:wght@${fontWeightParam}&display=swap');\n`;
  }
  if (viewer.message.active.includes("msgFontFamily")) {
    const fontFamilyParam = viewer.message.fontFamily?.replace(/ /g, "+");
    const fontWeightParam = viewer.message.fontWeight || "400";
    css += `@import url('https://fonts.googleapis.com/css2?family=${fontFamilyParam}:wght@${fontWeightParam}&display=swap');\n`;
  }

  // === Viewer Content Style ===
  if (
    contentActive.includes("contentFlexDirection") ||
    contentActive.includes("contentMargin") ||
    contentActive.includes("contentPadding")
  ) {
    css += `yt-live-chat-text-message-renderer #content {\n`;
    if (contentActive.includes("contentFlexDirection")) {
      css += `  flex-direction: ${viewer.content.flexDirection} !important;\n`;
    }
    if (contentActive.includes("contentMargin")) {
      const m = viewer.content.margin;
      css += `  margin: ${m.top}px ${m.right}px ${m.bottom}px ${m.left}px !important;\n`;
    }
    if (contentActive.includes("contentPadding")) {
      const p = viewer.content.padding;
      css += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    css += `}\n\n`;
  }

  // === Viewer Avatar Style ===
  if (contentActive.includes("contentAvatar")) {
    css += `yt-live-chat-text-message-renderer #author-photo {\n`;
    css += `  display: ${viewer.content.avatar} !important;\n`;
    css += `}\n\n`;
  }

  // === Viewer Name Style ===
  if (
    nameActive.includes("nameFontFamily") ||
    nameActive.includes("namePadding") ||
    nameActive.includes("nameBgColor")
  ) {
    css += `yt-live-chat-text-message-renderer #author-name {\n`;
    if (nameActive.includes("nameFontFamily")) {
      css += `  font-family: "${viewer.name.fontFamily}" !important;\n`;
      css += `  color: ${viewer.name.fontColor} !important;\n`;
      css += `  font-size: ${viewer.name.fontSize}px !important;\n`;
      css += `  font-weight: ${viewer.name.fontWeight}px !important;\n`;
      css += `  line-height: ${
        viewer.name.lineHeight || "normal"
      } !important;\n`;
      css += `  text-align: ${viewer.name.textAlign} !important;\n`;
    }
    if (nameActive.includes("namePadding")) {
      css += `  padding: ${getPaddingString(
        viewer.name.padding
      )} !important;\n`;
    }
    if (nameActive.includes("nameBgColor")) {
      css += `  background-color: ${viewer.name.bgColor} !important;\n`;
    }
    css += `}\n\n`;
  }

  // === Viewer Message Style ===
  if (
    msgActive.includes("msgFontFamily") ||
    msgActive.includes("msgPadding") ||
    msgActive.includes("msgBgColor")
  ) {
    css += `yt-live-chat-text-message-renderer #message {\n`;
    if (msgActive.includes("msgFontFamily")) {
      css += `  font-family: "${viewer.message.fontFamily}" !important;\n`;
      css += `  color: ${viewer.message.fontColor} !important;\n`;
      css += `  font-size: ${viewer.message.fontSize}px !important;\n`;
      css += `  font-weight: ${viewer.message.fontWeight}px !important;\n`;
      css += `  line-height: ${
        viewer.message.lineHeight || "normal"
      } !important;\n`;
      css += `  text-align: ${viewer.message.textAlign} !important;\n`;
    }
    if (msgActive.includes("msgPadding")) {
      css += `  padding: ${getPaddingString(
        viewer.message.padding
      )} !important;\n`;
    }
    if (msgActive.includes("msgBgColor")) {
      css += `  background-color: ${viewer.message.bgColor} !important;\n`;
    }
    css += `}\n\n`;
  }

  return css;
};
