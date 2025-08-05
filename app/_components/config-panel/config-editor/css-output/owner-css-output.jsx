export const OwnerCss = (owner) => {
  let css = "";
  const contentActive = owner?.content?.active || [];
  const nameActive = owner?.name?.active || [];
  const msgActive = owner?.message?.active || [];

  // === owner Content Style ===
  if (
    contentActive.includes("ownerContentFlexDirection") ||
    contentActive.includes("ownerContentMargin") ||
    contentActive.includes("ownerContentPadding")
  ) {
    css += `yt-live-chat-text-message-renderer[author-type="owner"] #content {\n`;
    if (contentActive.includes("modContentFlexDirection")) {
      css += `  display: flex !important;\n`;
      css += `  flex-direction: ${owner.content.flexDirection} !important;\n`;
    }
    if (contentActive.includes("ownerContentMargin")) {
      const m = owner.content.margin;
      css += `  margin: ${m.top}px ${m.right}px ${m.bottom}px ${m.left}px !important;\n`;
    }
    if (contentActive.includes("ownerContentPadding")) {
      const p = owner.content.padding;
      css += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    css += `}\n\n`;
  }

  // === owner Avatar Style ===
  if (contentActive.includes("ownerContentAvatar")) {
    css += `yt-live-chat-text-message-renderer[author-type="owner"] #author-photo {\n`;
    css += `  display: ${owner.content.avatar} !important;\n`;
    css += `}\n\n`;
  }

  // === owner Name Style ===
  if (
    nameActive.includes("ownerNameFontFamily") ||
    nameActive.includes("ownerNamePadding") ||
    nameActive.includes("ownerNameBgColor")
  ) {
    css += `yt-live-chat-text-message-renderer[author-type="owner"] #author-name {\n`;
    if (nameActive.includes("ownerNameFontFamily")) {
      css += `  font-family: "${owner.name.fontFamily}" !important;\n`;
      css += `  color: ${owner.name.fontColor} !important;\n`;
      css += `  font-size: ${owner.name.fontSize}px !important;\n`;
      css += `  font-weight: ${owner.name.fontWeight}px !important;\n`;
      css += `  line-height: ${
        owner.name.lineHeight || "normal"
      } !important;\n`;
      css += `  text-align: ${owner.name.textAlign} !important;\n`;
    }
    if (nameActive.includes("ownerNamePadding")) {
      const p = owner.name.padding;
      css += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    if (nameActive.includes("ownerNameMargin")) {
      const m = owner.name.margin;
      css += `  margin: ${m.top}px ${m.right}px ${m.bottom}px ${m.left}px !important;\n`;
    }
    if (nameActive.includes("ownerNameBgColor")) {
      css += `  background-color: ${owner.name.bgColor} !important;\n`;
    }
    css += `}\n\n`;
  }

  // === owner Message Style ===
  if (
    msgActive.includes("ownerMsgFontFamily") ||
    msgActive.includes("ownerMsgPadding") ||
    msgActive.includes("ownerMsgBgColor")
  ) {
    css += `yt-live-chat-text-message-renderer[author-type="owner"] #message {\n`;
    if (msgActive.includes("ownerMsgFontFamily")) {
      css += `  font-family: "${owner.message.fontFamily}" !important;\n`;
      css += `  color: ${owner.message.fontColor} !important;\n`;
      css += `  font-size: ${owner.message.fontSize}px !important;\n`;
      css += `  font-weight: ${owner.message.fontWeight}px !important;\n`;
      css += `  line-height: ${
        owner.message.lineHeight || "normal"
      } !important;\n`;
      css += `  text-align: ${owner.message.textAlign} !important;\n`;
    }
    if (msgActive.includes("ownerMsgPadding")) {
      const p = owner.message.padding;
      css += `  padding: ${p.top}px ${p.right}px ${p.bottom}px ${p.left}px !important;\n`;
    }
    if (msgActive.includes("ownerMsgMargin")) {
      const m = owner.message.margin;
      css += `  margin: ${m.top}px ${m.right}px ${m.bottom}px ${m.left}px !important;\n`;
    }
    if (msgActive.includes("ownerMsgBgColor")) {
      css += `  background-color: ${owner.message.bgColor} !important;\n`;
    }
    css += `}\n\n`;
  }

  return css;
};
