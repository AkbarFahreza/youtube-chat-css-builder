import React from "react";
import CodeBlock from "../code-bock";
import { ViewerCss } from "./config-editor/css-output/viewer-css-output";
import { ModeratorCss } from "./config-editor/css-output/moderator-css-output";
import { MemberCss } from "./config-editor/css-output/member-css-output";
import { OwnerCss } from "./config-editor/css-output/owner-css-output";

export default function CssOutput({ roleConfigs }) {
  const viewer = roleConfigs.viewer;
  const moderator = roleConfigs.moderator;
  const member = roleConfigs.member;
  const owner = roleConfigs.owner;

  let cssOutput = "";
  const fontImports = {};

  // Reusable collector
  const collectFont = (active, key, fontFamily, fontWeight = "500") => {
    if (!active.includes(key)) return;

    const family = fontFamily?.replace(/ /g, "+");
    const weight = fontWeight || "500";

    if (!family) return;

    if (!fontImports[family]) {
      fontImports[family] = new Set();
    }

    fontImports[family].add(weight);
  };

  // === Collect from all roles ===
  collectFont(
    owner.name.active,
    "ownerNameFontFamily",
    owner.name.fontFamily,
    owner.name.fontWeight
  );
  collectFont(
    owner.message.active,
    "ownerMsgFontFamily",
    owner.message.fontFamily,
    owner.message.fontWeight
  );

  collectFont(
    moderator.name.active,
    "modNameFontFamily",
    moderator.name.fontFamily,
    moderator.name.fontWeight
  );
  collectFont(
    moderator.message.active,
    "modMsgFontFamily",
    moderator.message.fontFamily,
    moderator.message.fontWeight
  );

  collectFont(
    member.name.active,
    "memberNameFontFamily",
    member.name.fontFamily,
    member.name.fontWeight
  );
  collectFont(
    member.message.active,
    "memberMsgFontFamily",
    member.message.fontFamily,
    member.message.fontWeight
  );

  collectFont(
    viewer.name.active,
    "nameFontFamily",
    viewer.name.fontFamily,
    viewer.name.fontWeight
  );
  collectFont(
    viewer.message.active,
    "msgFontFamily",
    viewer.message.fontFamily,
    viewer.message.fontWeight
  );

  // === Generate CSS @import statements ===
  for (const [family, weights] of Object.entries(fontImports)) {
    const weightsParam = Array.from(weights).sort().join(";");
    cssOutput += `@import url('https://fonts.googleapis.com/css2?family=${family}:wght@${weightsParam}&display=swap');\n`;
  }

  cssOutput += ViewerCss(viewer);
  cssOutput += ModeratorCss(moderator);
  cssOutput += MemberCss(member);
  cssOutput += OwnerCss(owner);
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
