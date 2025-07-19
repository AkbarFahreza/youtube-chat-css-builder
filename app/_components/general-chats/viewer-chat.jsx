import React from "react";
import Image from "next/image";

function ViewerChat({ padding, flexDirection, authorNameStyle }) {
  const previewStyle = {
    padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
    transition: "padding 0.2s",
    ...(flexDirection && {
      display: "flex",
      flexDirection: flexDirection,
    }),
  };

  return (
    <rz-chat-wrapper author-type="" className="items-center">
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
            Asep Magelang
          </div>
        </rz-name-wrapper>
        <span id="message">Hallo aku viewer biasa</span>
      </rz-chat-content>
    </rz-chat-wrapper>
  );
}

export default ViewerChat;
