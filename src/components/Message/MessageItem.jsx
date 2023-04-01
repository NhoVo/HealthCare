// lib
import classNames from "classnames/bind";
import { useState } from "react";

// me
import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function MessageItem({ message, own }) {
  const [showPreview, setShowPreview] = useState(false);

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
        <p className={cx("message-top-text")}>{message?.content}</p>
      ) : (
        <p className={cx("message-top-text")}>{message?.content}</p>
      )}
    </>
  );
}

export default MessageItem;
