export const MemberCss = (member) => {
  let css = "";
  const getPaddingString = (p) =>
    `${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`;

  const contentActive = member?.content?.active || [];
  const nameActive = member?.name?.active || [];
  const msgActive = member?.message?.active || [];

  // === Google Font Import ===
  if (member.name.active.includes("memberNameFontFamily")) {
    const fontFamilyParam = member.name.fontFamily?.replace(/ /g, "+");
    const fontWeightParam = member.name.fontWeight || "400";
    css += `@import url('https://fonts.googleapis.com/css2?family=${fontFamilyParam}:wght@${fontWeightParam}&display=swap');\n`;
  }
  if (member.message.active.includes("memberMsgFontFamily")) {
    const fontFamilyParam = member.message.fontFamily?.replace(/ /g, "+");
    const fontWeightParam = member.message.fontWeight || "400";
    css += `@import url('https://fonts.googleapis.com/css2?family=${fontFamilyParam}:wght@${fontWeightParam}&display=swap');\n`;
  }

  // === member Content Style ===
  if (
    contentActive.includes("memberContentFlexDirection") ||
    contentActive.includes("memberContentMargin") ||
    contentActive.includes("memberContentPadding")
  ) {
    css += `yt-live-chat-text-message-renderer[author-type="member"] #content {\n`;
    if (contentActive.includes("modContentFlexDirection")) {
      css += `  flex-direction: ${member.content.flexDirection} !important;\n`;
    }
    if (contentActive.includes("memberContentMargin")) {
      const m = member.content.margin;
      css += `  margin: ${m.top}px ${m.right}px ${m.bottom}px ${m.left}px !important;\n`;
    }
    if (contentActive.includes("memberContentPadding")) {
      const p = member.content.padding;
      css += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    css += `}\n\n`;
  }

  // === member Avatar Style ===
  if (contentActive.includes("memberContentAvatar")) {
    css += `yt-live-chat-text-message-renderer[author-type="member"] #author-photo {\n`;
    css += `  display: ${member.content.avatar} !important;\n`;
    css += `}\n\n`;
  }

  // === member Name Style ===
  if (
    nameActive.includes("memberNameFontFamily") ||
    nameActive.includes("memberNamePadding") ||
    nameActive.includes("memberNameBgColor")
  ) {
    css += `yt-live-chat-text-message-renderer[author-type="member"] #author-name {\n`;
    if (nameActive.includes("memberNameFontFamily")) {
      css += `  font-family: "${member.name.fontFamily}" !important;\n`;
      css += `  color: ${member.name.fontColor} !important;\n`;
      css += `  font-size: ${member.name.fontSize}px !important;\n`;
      css += `  font-weight: ${member.name.fontWeight}px !important;\n`;
      css += `  line-height: ${
        member.name.lineHeight || "normal"
      } !important;\n`;
      css += `  text-align: ${member.name.textAlign} !important;\n`;
    }
    if (nameActive.includes("memberNamePadding")) {
      css += `  padding: ${getPaddingString(
        member.name.padding
      )} !important;\n`;
    }
    if (nameActive.includes("memberNameBgColor")) {
      css += `  background-color: ${member.name.bgColor} !important;\n`;
    }
    css += `}\n\n`;
  }

  // === member Message Style ===
  if (
    msgActive.includes("memberMsgFontFamily") ||
    msgActive.includes("memberMsgPadding") ||
    msgActive.includes("memberMsgBgColor")
  ) {
    css += `yt-live-chat-text-message-renderer[author-type="member"] #message {\n`;
    if (msgActive.includes("memberMsgFontFamily")) {
      css += `  font-family: "${member.message.fontFamily}" !important;\n`;
      css += `  color: ${member.message.fontColor} !important;\n`;
      css += `  font-size: ${member.message.fontSize}px !important;\n`;
      css += `  font-weight: ${member.message.fontWeight}px !important;\n`;
      css += `  line-height: ${
        member.message.lineHeight || "normal"
      } !important;\n`;
      css += `  text-align: ${member.message.textAlign} !important;\n`;
    }
    if (msgActive.includes("memberMsgPadding")) {
      css += `  padding: ${getPaddingString(
        member.message.padding
      )} !important;\n`;
    }
    if (msgActive.includes("memberMsgBgColor")) {
      css += `  background-color: ${member.message.bgColor} !important;\n`;
    }
    css += `}\n\n`;
  }

  return css;
};
