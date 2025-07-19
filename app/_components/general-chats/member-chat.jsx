import React from "react";
import Image from "next/image";
function ViewerChat() {
  return (
    <rz-chat-wrapper author-type="">
      <rz-author-photo id="author-photo">
        <Image
          src="https://res.cloudinary.com/dxcmt3zoc/image/upload/v1720782939/yt-profile-pict.png"
          alt="user"
          width={24}
          height={24}
        />
      </rz-author-photo>
      <rz-chat-content id="content">
        <rz-name-wrapper>
          <div id="author-name" className="text-white/70">
            Asep Magelang
          </div>
        </rz-name-wrapper>
        <span id="message">Hallo aku viewer biasa</span>
      </rz-chat-content>
    </rz-chat-wrapper>
  );
}

export default ViewerChat;
