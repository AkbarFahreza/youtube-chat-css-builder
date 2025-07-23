import React from "react";
import CodeBlock from "../code-bock";

export default function CssOutput({ cssOutput }) {
  console.log(cssOutput);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput.trim());
    alert("CSS copied to clipboard!");
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center py-2  ">
        <h4 className="text-white font-semibold ">CSS Output:</h4>
        <button
          onClick={copyToClipboard}
          className="text-purple-500 bg-purple-800/25 border border-purple-500 hover:bg-purple-800/60 cursor-pointer transition-all duration-200 rounded-lg px-4 py-1"
        >
          Copy CSS
        </button>
      </div>
      <CodeBlock code={cssOutput.trim()} language="css" />
    </>
  );
}
