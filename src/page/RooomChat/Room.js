import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect } from "react";

const Room = () => {
  const { roomID } = useParams();
  const location = useLocation();
  const user = location.state?.user;

  const vnTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const meeting = async (element) => {
    const appID = 1646990952;
    const serverSecret = process.env.REACT_APP_ZEGOCLOUD_API_KEY;

    const hostKitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      new Date(vnTime).getTime().toString(),
      "Host"
    );
    const zp = ZegoUIKitPrebuilt.create(hostKitToken);

    // Tạo ghi chú

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      sharedLinks: [
        {
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      localLanguage: {
        language: "vi-VN",
      },
    });
  };

  return (
    <>
      <div ref={meeting} style={{ width: "100vw", height: "100vh" }}></div>
    </>
  );
};

export default Room;
