import React from "react";
import CodeBlock from "../code-bock";
import { ViewerCss } from "./config-editor/css-output/viewer-css-output";
import { ModeratorCss } from "./config-editor/css-output/moderator-css-output";
import { MemberCss } from "./config-editor/css-output/member-css-output";

export default function CssOutput({ roleConfigs }) {
  const viewer = roleConfigs.viewer;
  const moderator = roleConfigs.moderator;
  const member = roleConfigs.member;
  const owner = roleConfigs.owner;

  let cssOutput = "";

  cssOutput += ViewerCss(viewer);
  cssOutput += ModeratorCss(moderator);
  cssOutput += MemberCss(member);
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
