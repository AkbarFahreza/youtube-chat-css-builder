// ./_components/general-chats/Moderator-chat.jsx
"use client";

import React, { useEffect } from "react";
import Image from "next/image";

function ModeratorChat({ contentStyle, authorNameStyle, authorMsgStyle }) {
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

  // Select where style to apply
  const filteredContentStyle = ["padding", "flexDirection"];
  const filteredAvatarStyle = ["display"];

  const CntStyle = Object.fromEntries(
    Object.entries(contentStyle).filter(([key]) =>
      filteredContentStyle.includes(key)
    )
  );
  const AvatarStyle = Object.fromEntries(
    Object.entries(contentStyle).filter(([key]) =>
      filteredAvatarStyle.includes(key)
    )
  );

  return (
    <rz-chat-wrapper author-type="moderator" className="items-center">
      <rz-author-photo id="author-photo" style={AvatarStyle}>
        <Image
          src="https://res.cloudinary.com/dxcmt3zoc/image/upload/v1720782939/yt-profile-pict.png"
          alt="user"
          width={24}
          height={24}
        />
      </rz-author-photo>
      <rz-chat-content id="content" style={CntStyle}>
        <rz-name-wrapper className="flex flex-row items-center">
          <div
            id="author-name"
            className="text-white/70"
            style={authorNameStyle}
          >
            Moderator Name
          </div>
          <div
            style={{
              width: "16px",
              height: "16px",
              fill: authorNameStyle.color,
              paddingLeft: 2,
            }}
          >
            <svg
              viewBox="0 0 16 16"
              focusable="false"
              style={{
                pointerEvents: "none",
                display: "block",
                width: "16px",
                height: "16px",
              }}
            >
              <path d="M9.64589146,7.05569719 C9.83346524,6.562372 9.93617022,6.02722257 9.93617022,5.46808511 C9.93617022,3.00042984 7.93574038,1 5.46808511,1 C4.90894765,1 4.37379823,1.10270499 3.88047304,1.29027875 L6.95744681,4.36725249 L4.36725255,6.95744681 L1.29027875,3.88047305 C1.10270498,4.37379824 1,4.90894766 1,5.46808511 C1,7.93574038 3.00042984,9.93617022 5.46808511,9.93617022 C6.02722256,9.93617022 6.56237198,9.83346524 7.05569716,9.64589147 L12.4098057,15 L15,12.4098057 L9.64589146,7.05569719 Z" />
            </svg>
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
