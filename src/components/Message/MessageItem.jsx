// lib
import classNames from "classnames/bind";
import { useState } from "react";

// me
import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function MessageItem({ message, own }) {
  const [showPreview, setShowPreview] = useState(false);
  console.log("message", message);
  // show preview
  const handleShowPreviewImageAndVideo = () => {
    setShowPreview(!showPreview);
  };

  // hide preview
  const handleHidePreviewImageAndVideo = () => {
    setShowPreview(false);
  };

  return (
    <>
      {own ? (
        <>
          {message.typeMessage === "IMAGE" ? (
            <button
              className={cx("preview-image")}
              onClick={handleShowPreviewImageAndVideo}
            >
              <img
                className={cx("image-send-user")}
                src={message.file[0]}
                alt="img"
              />
            </button>
          ) : (
            <p className={cx("message-top-text")}>{message?.content}</p>
          )}
        </>
      ) : (
        <p className={cx("message-top-text")}>{message?.content}</p>
      )}
    </>
  );
}

export default MessageItem;
