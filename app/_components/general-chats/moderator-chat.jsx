// ./_components/general-chats/Moderator-chat.jsx
"use client";

import React, { useEffect } from "react";
import Image from "next/image";

function ModeratorChat({
  padding,
  flexDirection,

  authorNameStyle,
  authorMsgStyle,
}) {
  const makeGoogleFontLink = (style, id) => {
    if (!style?.fontFamily) return null;
    const family = style.fontFamily.replace(/['"]/g, "").split(",")[0].trim();
    const weight = style.fontWeight || "400";
    const familyParam = family.replace(/\s+/g, "+");
    return {
      href: `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&display=swap`,
      id: `google-font-${id}-${familyParam}-${weight}`,
    };
  };

  const nameFont = makeGoogleFontLink(authorNameStyle, "name");
  const msgFont = makeGoogleFontLink(authorMsgStyle, "msg");
  useEffect(() => {
    [nameFont, msgFont].forEach((font) => {
      if (!font) return;
      // avoid duplicating
      if (!document.getElementById(font.id)) {
        const link = document.createElement("link");
        link.id = font.id;
        link.rel = "stylesheet";
        link.href = font.href;
        document.head.appendChild(link);
      }
    });
    // (Optional) clean up if component unmounts
    return () => {
      [nameFont, msgFont].forEach((font) => {
        if (font) {
          const existing = document.getElementById(font.id);
          if (existing) existing.remove();
        }
      });
    };
  }, [nameFont?.href, msgFont?.href]); // re-run when hrefs change

  const previewStyle = {
    padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
    transition: "padding 0.2s",
    ...(flexDirection && {
      display: "flex",
      flexDirection,
    }),
  };
  return (
    <rz-chat-wrapper author-type="moderator" className="items-center">
      <rz-author-photo id="author-photo">
        <Image
          src="https://res.cloudinary.com/dxcmt3zoc/image/upload/v1720782939/yt-profile-pict.png"
          alt="user"
          width={24}
          height={24}
        />
      </rz-author-photo>
      <rz-chat-content id="content" style={previewStyle}>
        <rz-name-wrapper>
          <div
            id="author-name"
            className="text-white/70"
            style={authorNameStyle}
          >
            Moderator Name
          </div>
        </rz-name-wrapper>
        <span id="message" style={authorMsgStyle}>
          Hallo aku moderator
        </span>
      </rz-chat-content>
    </rz-chat-wrapper>
  );
}

export default ModeratorChat;
