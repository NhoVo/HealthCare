import React, { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { roomID } = useParams();
  const location = useLocation();
  const meetingRef = useRef(null);

  const user = location.state?.user;

  const vnTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const meeting = async (element) => {
    const appID = 1643966043;
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
