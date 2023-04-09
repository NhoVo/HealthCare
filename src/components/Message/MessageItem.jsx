// lib
import classNames from "classnames/bind";
import { useState } from "react";

// me
import styles from "./Message.module.scss";
import ModelWrapper from "../ModelWrapper/ModelWrapper";
import FileMessage from "../FileMessage/FileMessage";

const cx = classNames.bind(styles);

function MessageItem({ message, own }) {
  const [showPreview, setShowPreview] = useState(false);
  //console.log("message", message);
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
            <>
              {message.file?.length > 1 ? (
                <>
                  {message?.content && (
                    <p className={cx("message-top-text")}>{message?.content}</p>
                  )}
                  {message.file?.map((mess, index) => {
                    return (
                      <div
                        key={index}
                        className={cx("display-group-item-image")}
                      >
                        <button
                          className={cx("preview-image")}
                          onClick={handleShowPreviewImageAndVideo}
                        >
                          <img
                            className={cx("image-send-user")}
                            src={mess?.url}
                            alt="img"
                          />
                        </button>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {message?.content && (
                    <p className={cx("message-top-text")}>{message?.content}</p>
                  )}
                  <button
                    className={cx("preview-image")}
                    onClick={handleShowPreviewImageAndVideo}
                  >
                    <img
                      className={cx("image-send-user")}
                      src={message?.file[0]?.url}
                      alt="img"
                    />
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {message.typeMessage === "VIDEO" ? (
                <div>
                  {message?.content && (
                    <p className={cx("message-top-text")}>{message?.content}</p>
                  )}
                  <button
                    className={cx("preview-image")}
                    onClick={handleShowPreviewImageAndVideo}
                  >
                    <video
                      controls
                      className={cx("image-send-user")}
                      src={message?.file[0].url}
                      alt="img"
                    />
                  </button>
                  <ModelWrapper
                    className={cx("model-preview")}
                    open={showPreview}
                    onClose={handleHidePreviewImageAndVideo}
                  >
                    <video
                      controls
                      className={cx("preview-image-send-user")}
                      src={message?.file[0].url}
                      alt="img"
                    />
                  </ModelWrapper>
                </div>
              ) : (
                <>
                  {message.typeMessage === "FILE" ? (
                    <>
                      {message.content && (
                        <p className={cx("message-top-text")}>
                          {message.content}
                        </p>
                      )}
                      <div className={cx("file-own")}>
                        <FileMessage message={message} />
                      </div>
                    </>
                  ) : (
                    <p className={cx("message-top-text")}>{message?.content}</p>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {message.typeMessage === "IMAGE" ? (
            <>
              {message.file?.length > 1 ? (
                <>
                  {message.content && (
                    <p className={cx("message-top-text")}>{message?.content}</p>
                  )}
                  {message.file?.map((mess, index) => {
                    return (
                      <div
                        key={index}
                        className={cx("display-group-item-image")}
                      >
                        <button
                          className={cx("preview-image")}
                          onClick={handleShowPreviewImageAndVideo}
                        >
                          <img
                            className={cx("image-send-user")}
                            src={mess?.url}
                            alt="img"
                          />
                        </button>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div>
                  {message.content && (
                    <p className={cx("message-top-text")}>{message?.content}</p>
                  )}
                  <button
                    className={cx("preview-image")}
                    onClick={handleShowPreviewImageAndVideo}
                  >
                    <img
                      className={cx("image-send-user")}
                      src={message.file[0]?.url}
                      alt="img"
                    />
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {message.typeMessage === "VIDEO" ? (
                <div>
                  {message?.content && (
                    <p className={cx("message-top-text")}>{message?.content}</p>
                  )}
                  <button
                    className={cx("preview-image")}
                    onClick={handleShowPreviewImageAndVideo}
                  >
                    <video
                      controls
                      className={cx("image-send-user")}
                      src={message?.file[0].url}
                      alt="img"
                    />
                  </button>
                  <ModelWrapper
                    className={cx("model-preview")}
                    open={showPreview}
                    onClose={handleHidePreviewImageAndVideo}
                  >
                    <video
                      controls
                      className={cx("preview-image-send-user")}
                      src={message?.file[0].url}
                      alt="img"
                    />
                  </ModelWrapper>
                </div>
              ) : (
                <>
                  {message.typeMessage === "FILE" ? (
                    <>
                      {message.content && (
                        <p className={cx("message-top-text")}>
                          {message.content}
                        </p>
                      )}
                      <div className={cx("file-receiver")}>
                        <FileMessage message={message} />
                      </div>
                    </>
                  ) : (
                    <p className={cx("message-top-text")}>{message?.content}</p>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default MessageItem;
