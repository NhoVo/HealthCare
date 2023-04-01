import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { roomID } = useParams();
  const location = useLocation();

  const navigate = useNavigate();
  // const handleGoHome = () => {
  //   navigate(`/Home`);
  // };
  const vnTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const meeting = async (element) => {
    const appID = 1646990952;
    const serverSecret = "b46f09ad8c3782def3f33c6224082d7e";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      new Date(vnTime).getTime().toString(),
      "tenBan"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      //call group
      // scenario: {
      //   mode: ZegoUIKitPrebuilt.GroupCall,
      // },
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
