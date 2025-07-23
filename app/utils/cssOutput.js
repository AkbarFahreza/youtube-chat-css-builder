// lib/cssOutput.js
export function generateCSS({ nameConfig, msgConfig }) {
  const nameStyles = nameConfig.active.map((key) => {
    switch (key) {
      case "nameFontFamily":
        return `font-family: ${nameConfig.fontFamily.value};`;
      case "nameFontWeight":
        return `font-weight: ${nameConfig.fontWeight};`;
      case "nameLineHeight":
        return `line-height: ${nameConfig.lineHeight};`;
      case "nameTextAlign":
        return `text-align: ${nameConfig.textAlign};`;
      case "nameFontSize":
        return `font-size: ${nameConfig.fontSize}px;`;
      case "nameFontColor":
        return `color: ${nameConfig.fontColor};`;
      default:
        return "";
    }
  });

  const msgStyles = msgConfig.active.map((key) => {
    switch (key) {
      case "msgFontFamily":
        return `font-family: ${msgConfig.fontFamily.value};`;
      case "msgFontWeight":
        return `font-weight: ${msgConfig.fontWeight};`;
      case "msgLineHeight":
        return `line-height: ${msgConfig.lineHeight};`;
      case "msgTextAlign":
        return `text-align: ${msgConfig.textAlign};`;
      case "msgFontSize":
        return `font-size: ${msgConfig.fontSize}px;`;
      case "msgFontColor":
        return `color: ${msgConfig.fontColor};`;
      default:
        return "";
    }
  });

  return `
.name {
  ${nameStyles.join("\n  ")}
}

.message {
  ${msgStyles.join("\n  ")}
}
  `.trim();
}
