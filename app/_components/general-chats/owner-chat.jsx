"use client";

import React, { useEffect } from "react";
import Image from "next/image";

function OwnerChat({ contentStyle, authorNameStyle, authorMsgStyle }) {
  const makeGoogleFontLink = (style, id) => {
    if (!style?.fontFamily) return null;
    const family = style.fontFamily.replace(/['"]/g, "").split(",")[0].trim();
    const weight = style.fontWeight || "500";
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
  const filteredContentStyle = ["padding", "flexDirection", "margin"];
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
    <rz-chat-wrapper author-type="owner" className="items-center">
      <rz-author-photo id="author-photo" style={AvatarStyle}>
        <Image
          src="https://res.cloudinary.com/dxcmt3zoc/image/upload/v1720782939/yt-profile-pict.png"
          alt="user"
          width={24}
          height={24}
        />
      </rz-author-photo>
      <rz-chat-content id="content" style={CntStyle}>
        <rz-name-wrapper>
          <div
            id="author-name"
            className="w-fit"
            style={{
              ...authorNameStyle,
              padding: authorNameStyle?.padding || "2px 4px 2px 4px",
              borderRadius: "2px",
              backgroundColor: authorNameStyle?.backgroundColor || "#ffd600",
            }}
          >
            Dek Reza
          </div>
        </rz-name-wrapper>
        <span id="message" style={authorMsgStyle}>
          Owner message are here
        </span>
      </rz-chat-content>
    </rz-chat-wrapper>
  );
}

export default OwnerChat;
