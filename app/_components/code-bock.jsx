"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ code, language = "css" }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      wrapLongLines
      customStyle={{
        borderRadius: "8px",
        padding: "16px",
        fontSize: "14px",
        // background: "#1e1e1e",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
