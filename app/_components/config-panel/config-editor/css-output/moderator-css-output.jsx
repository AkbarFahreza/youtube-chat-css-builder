// viewer-chat-css-output.jsx

export const ModeratorCss = (moderator) => {
  let css = "";
  const getPaddingString = (p) =>
    `${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`;

  const contentActive = moderator?.content?.active || [];
  const nameActive = moderator?.name?.active || [];
  const msgActive = moderator?.message?.active || [];

  // === Google Font Import ===
  if (moderator.name.active.includes("modNameFontFamily")) {
    const fontFamilyParam = moderator.name.fontFamily?.replace(/ /g, "+");
    const fontWeightParam = moderator.name.fontWeight || "400";
    css += `@import url('https://fonts.googleapis.com/css2?family=${fontFamilyParam}:wght@${fontWeightParam}&display=swap');\n`;
  }
  if (moderator.message.active.includes("modMsgFontFamily")) {
    const fontFamilyParam = moderator.message.fontFamily?.replace(/ /g, "+");
    const fontWeightParam = moderator.message.fontWeight || "400";
    css += `@import url('https://fonts.googleapis.com/css2?family=${fontFamilyParam}:wght@${fontWeightParam}&display=swap');\n`;
  }

  // === moderator Content Style ===
  if (
    contentActive.includes("modContentFlexDirection") ||
    contentActive.includes("modContentMargin") ||
    contentActive.includes("modContentPadding")
  ) {
    css += `yt-live-chat-text-message-renderer[author-type="moderator"] #content {\n`;
    if (contentActive.includes("modContentFlexDirection")) {
      css += `  display: flex !important;\n`;
      css += `  flex-direction: ${moderator.content.flexDirection} !important;\n`;
    }
    if (contentActive.includes("modContentMargin")) {
      const m = moderator.content.margin;
      css += `  margin: ${m.top}px ${m.right}px ${m.bottom}px ${m.left}px !important;\n`;
    }
    if (contentActive.includes("modContentPadding")) {
      const p = moderator.content.padding;
      css += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    css += `}\n\n`;
  }

  // === moderator Avatar Style ===
  if (contentActive.includes("modContentAvatar")) {
    css += `yt-live-chat-text-message-renderer[author-type="moderator"] #author-photo {\n`;
    css += `  display: ${moderator.content.avatar} !important;\n`;
    css += `}\n\n`;
  }

  // === moderator Name Style ===
  if (
    nameActive.includes("modNameFontFamily") ||
    nameActive.includes("modNamePadding") ||
    nameActive.includes("modNameBgColor")
  ) {
    css += `yt-live-chat-text-message-renderer[author-type="moderator"] #author-name {\n`;
    if (nameActive.includes("modNameFontFamily")) {
      css += `  font-family: "${moderator.name.fontFamily}" !important;\n`;
      css += `  color: ${moderator.name.fontColor} !important;\n`;
      css += `  font-size: ${moderator.name.fontSize}px !important;\n`;
      css += `  font-weight: ${moderator.name.fontWeight}px !important;\n`;
      css += `  line-height: ${
        moderator.name.lineHeight || "normal"
      } !important;\n`;
      css += `  text-align: ${moderator.name.textAlign} !important;\n`;
    }
    if (nameActive.includes("modoeratorNamePadding")) {
      const p = moderator.name.padding;
      css += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    if (nameActive.includes("modoeratorNameMargin")) {
      const m = moderator.name.margin;
      css += `  margin: ${m.top}px ${m.right}px ${m.bottom}px ${m.left}px !important;\n`;
    }
    if (nameActive.includes("modNameBgColor")) {
      css += `  background-color: ${moderator.name.bgColor} !important;\n`;
    }
    css += `}\n\n`;
  }

  // === moderator Message Style ===
  if (
    msgActive.includes("modMsgFontFamily") ||
    msgActive.includes("modMsgPadding") ||
    msgActive.includes("modMsgBgColor")
  ) {
    css += `yt-live-chat-text-message-renderer[author-type="moderator"] #message {\n`;
    if (msgActive.includes("modMsgFontFamily")) {
      css += `  font-family: "${moderator.message.fontFamily}" !important;\n`;
      css += `  color: ${moderator.message.fontColor} !important;\n`;
      css += `  font-size: ${moderator.message.fontSize}px !important;\n`;
      css += `  font-weight: ${moderator.message.fontWeight}px !important;\n`;
      css += `  line-height: ${
        moderator.message.lineHeight || "normal"
      } !important;\n`;
      css += `  text-align: ${moderator.message.textAlign} !important;\n`;
    }
    if (msgActive.includes("moderatorMsgPadding")) {
      const p = moderator.message.padding;
      css += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    if (msgActive.includes("moderatorMsgMargin")) {
      const m = moderator.message.margin;
      css += `  margin: ${m.top}px ${m.right}px ${m.bottom}px ${m.left}px !important;\n`;
    }
    if (msgActive.includes("modMsgBgColor")) {
      css += `  background-color: ${moderator.message.bgColor} !important;\n`;
    }
    css += `}\n\n`;
  }

  return css;
};
