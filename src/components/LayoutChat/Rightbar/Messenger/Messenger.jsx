// lib
import classNames from "classnames/bind";
import TippyHeadless from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import {
  faClose,
  faFaceSmile,
  faFile,
  faImage,
  faPaperclip,
  faThumbsUp,
  faVideo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { BiDockRight } from "react-icons/bi";

import { CircularProgress } from "@material-ui/core";
import EmojiPicker, { SkinTones } from "emoji-picker-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Peer from "simple-peer";

// me
import styles from "./Messenger.module.scss";
import Message from "../../../Message/Message";
import Popper from "../../../Popper/Popper";
import OnlineStatus from "../../../OnlineStatus/OnlineStatus";

import PreviewFileMessage from "../../../FileMessage/PreviewFileMessage";

import ModelWrapper from "../../../ModelWrapper/ModelWrapper";

import { useDispatch, useSelector } from "react-redux";
import {
  listAllConversation,
  listAllMessage,
  listImage,
  userLogin,
} from "../../../../Redux/selector";
import Conversation, {
  fetchPostMessage,
  fetchUploadFiles,
  pushMessage,
} from "../../../../Redux/Features/Conversation/Conversation";
import { useMemo } from "react";
import { io } from "socket.io-client";
import { socket } from "../../../../App";
import { fetchAllmessage } from "../../../../Redux/Features/Conversation/Conversation";

const cx = classNames.bind(styles);

function Messenger({ setInfor, infor }) {
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState("");
  const [newImageMessage, setNewImageMessage] = useState([]);
  const [newFileMessage, setNewFileMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [btnClosePreview, setBtnClosePreview] = useState(false);
  const [previewEmoji, setPreviewEmoji] = useState(false);
  const listMessage = useSelector(listAllMessage);
  const listConversation = useSelector(listAllConversation);

  const inForConversation = listConversation.filter((_c) =>
    listMessage[0]?.conversationId?.includes(_c?.id)
  );
  const imgMessage = useSelector(listImage);

  const user = useSelector(userLogin);
  const scrollMessenger = useRef();
  //call video

  const conversationOnlineStatus = listMessage?.filter(
    (message) =>
      message?.user.id !== user?.doctor?.id && message?.user.id !== user?.id
  );

  useEffect(() => {
    conversationOnlineStatus &&
      listMessage &&
      scrollMessenger.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationOnlineStatus, listMessage]);
  // handle change message
  const handleChangeMessage = (e) => {
    const mess = e.target.value;

    if (!mess.startsWith(" ")) {
      setNewMessage(mess);
    }
  };

  // handle change image and preview image
  const handleChangeImageMessage = (e) => {
    const files = e.target.files;
    const listImg = [];

    [...files].forEach((file) => {
      listImg.push({
        data: file,
        preview: URL.createObjectURL(file),
      });
    });

    setNewImageMessage(listImg);
    setBtnClosePreview(true); // !btnClosePreview
  };

  // handle change file
  const handleChangeFileMessage = (e) => {
    const file = e.target.files[0];
    file.previewFile = URL.createObjectURL(file);
    setNewFileMessage(file);
    setBtnClosePreview(true); // !btnClosePreview
  };

  // cleanup func
  useEffect(() => {
    return () => {
      newImageMessage && URL.revokeObjectURL(newImageMessage.preview);
    };
  }, [newImageMessage]);

  useEffect(() => {
    return () => {
      newFileMessage && URL.revokeObjectURL(newFileMessage.previewFile);
    };
  }, [newFileMessage]);

  //socket- nhan tin
  useEffect(() => {
    socket.on("newMessage", (data) => {
      dispatch(Conversation.actions.arrivalMessageFromSocket(data.data));
    });
    return () => socket.off("newMessage");
  }, []);
  // handle preview emoji
  const handlePreviewEmoji = () => {
    setPreviewEmoji(true);
  };

  const handleEmojiClicked = (emojiObj, e) => {
    let emojis = emojiObj.emoji;
    const _message = [...newMessage, emojis];
    setNewMessage(_message.join(""));
  };

  // handle button send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    // check size file
    if (
      newFileMessage?.size / 1024 / 1024 > 5 ||
      newImageMessage?.size / 1024 / 1024 > 5
    ) {
      toast.error(
        "Xin lỗi, file của bạn vượt quá 5 MB. Vui lòng chọn file khác để gửi!"
      );
      return;
    }
    // check size file
    if (newImageMessage.length === 0 && newFileMessage === null) {
      const data = {
        typeMessage: "TEXT",
        idConversation: listMessage[0].conversationId,
        content: newMessage,
      };
      dispatch(fetchPostMessage(data));
    } else if (newImageMessage.length === 0 && newFileMessage !== null) {
      const dataImg = {
        files: newFileMessage,
      };
      await dispatch(fetchUploadFiles(dataImg)).then((value) => {
        const data = {
          typeMessage: "FILE",
          idConversation: listMessage[0]?.conversationId,
          content: newMessage,
          file: [value?.payload[0].id],
        };
        dispatch(fetchPostMessage(data));
      });
    } else {
      const dataImg = {
        files: newImageMessage,
      };
      await dispatch(fetchUploadFiles(dataImg)).then((value) => {
        if (
          value?.payload[0]?.name.split(".")[
            value?.payload[0]?.name.split(".").length - 1
          ] === "mp4"
        ) {
          const data = {
            typeMessage: "VIDEO",
            idConversation: listMessage[0]?.conversationId,
            content: newMessage,
            file: [value?.payload[0].id],
          };
          dispatch(fetchPostMessage(data));
        } else {
          const listImg = value?.payload?.map((item) => item.id);
          const data = {
            typeMessage: "IMAGE",
            idConversation: listMessage[0]?.conversationId,
            content: newMessage,
            file: listImg,
          };
          dispatch(fetchPostMessage(data));
        }
      });
    }
    setNewMessage("");
    setNewImageMessage([]);
    setNewFileMessage(null);
    setBtnClosePreview(false);
  };

  const handleSendFlastLikeMessage = async (e) => {
    e.preventDefault();

    // dispatch(
    //   fetchApiSendMessage({
    //     conversationID: conversation.id,
    //     senderID: user._id,
    //     content: "👍",
    //     imageLinks: newImageMessage,
    //     fileLink: newFileMessage,
    //   })
    // );

    // setNewMessage("");
    // setNewImageMessage([]);
    // setNewFileMessage(null);
    // setBtnClosePreview(false);
  };

  // handle close preview
  const handleClosePreview = () => {
    setNewImageMessage([]);
    setNewFileMessage(null);
    setBtnClosePreview(false);
  };

  // scroll messenger
  // useEffect(() => {
  //   conversation &&
  //     listMessage &&
  //     scrollMessenger.current?.scrollIntoView({ behavior: "smooth" });
  // }, [conversation, listMessage]);
  const handleOpenInfor = () => {
    console.log("có");

    setInfor(!infor);
  };
  return (
    <div className={cx("messenger")}>
      <div className={cx("messenger-header")}>
        {/* Online user (status) */}
        <OnlineStatus
          onlineUsers={onlineUsers}
          conversation={conversationOnlineStatus}
        />
        <div>
          <Tippy
            className={cx("tool-tip")}
            content="Cuộc gọi video"
            delay={[200, 0]}
          >
            <button className={cx("btn-click-icon")}>
              <FontAwesomeIcon className={cx("icon")} icon={faVideo} />
            </button>
          </Tippy>
          <Tippy
            className={cx("tool-tip")}
            content="Thông tin hội thoại"
            delay={[200, 0]}
          >
            <button className={cx("btn-click-icon")} onClick={handleOpenInfor}>
              {!infor ? (
                <BiDockRight
                  className={cx("icon")}
                  size={"20px"}
                  color="#0091ff"
                />
              ) : (
                <BiDockRight className={cx("icon")} size={"20px"} />
              )}
            </button>
          </Tippy>
        </div>
      </div>

      {/* onScroll={handleLoadingMessagesLast} */}
      <div className={cx("messenger-body")}>
        {/* Messages */}
        {false ? (
          <CircularProgress className={cx("loading-messages")} />
        ) : (
          <>
            {listMessage.map((message) => {
              return (
                <div key={message?._id} ref={scrollMessenger}>
                  <Message
                    message={message}
                    own={
                      message?.user.id === user?.doctor?.id ||
                      message?.user.id === user?.id
                    }

                    // user={user}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Message conversation */}
      <div className={cx("messenger-footer")}>
        <div className={cx("toolbar-on-chat-input")}>
          {/* option image */}
          <label htmlFor="file">
            <div className={cx("option-image-icon")}>
              <Tippy
                className={cx("tool-tip")}
                content="Gửi hình ảnh hoặc video"
                delay={[200, 0]}
              >
                <FontAwesomeIcon className={cx("option-icon")} icon={faImage} />
              </Tippy>
              <input
                className={cx("hide")}
                type="file"
                id="file"
                accept=".png, .jpg, .jpeg, .mov, .mp4"
                onChange={handleChangeImageMessage}
                multiple
              />
            </div>
          </label>
          {/* option file */}
          <TippyHeadless
            render={(attrs) => (
              <div tabIndex="-1" {...attrs}>
                {/* Sub menu option footer */}
                <Popper className={cx("menu-option-file")}>
                  <>
                    <label htmlFor="files">
                      <div className={cx("option-file-btn-fix")}>
                        <FontAwesomeIcon
                          className={cx("sub-menu-icon-footer")}
                          icon={faFile}
                        />
                        Chọn File
                        <input
                          className={cx("hide")}
                          type="file"
                          id="files"
                          accept=".docx, .pptx, .pdf, .xlsx"
                          onChange={handleChangeFileMessage}
                        />
                      </div>
                    </label>
                    <button className={cx("option-file-btn")}>
                      <FontAwesomeIcon
                        className={cx("sub-menu-icon-footer")}
                        icon={faGoogleDrive}
                      />
                      Gửi File từ Google Driver
                    </button>
                  </>
                </Popper>
              </div>
            )}
            delay={[0, 100]}
            placement="top-start"
            trigger="click"
            interactive
          >
            <Tippy
              className={cx("tool-tip")}
              content="Đính kèm File"
              delay={[200, 0]}
            >
              <div className={cx("option-file-icon")}>
                <FontAwesomeIcon
                  className={cx("option-icon")}
                  icon={faPaperclip}
                />
              </div>
            </Tippy>
          </TippyHeadless>
        </div>
        <div className={cx("message-container")}>
          {/* Input message */}
          {/* const blockMembers = useSelector(filterBlockMembers); infoUser */}
          {/*  ? ( */}

          <textarea
            className={cx("message-input")}
            value={
              newMessage && newMessage.emoji?.join("")
                ? newMessage && newMessage.emoji?.join("")
                : newMessage.emoji?.join("")
                ? newMessage.emoji?.join("")
                : newMessage
            }
            onChange={handleChangeMessage}
            placeholder="Nhập tin nhắn ..."
          ></textarea>

          {/* Preview emoji */}
          <TippyHeadless
            render={(attrs) => (
              <div tabIndex="-1" {...attrs}>
                <Popper>
                  {previewEmoji && (
                    <div className={cx("display-preview-emoji")}>
                      <EmojiPicker
                        onEmojiClick={handleEmojiClicked}
                        defaultSkinTone={SkinTones}
                        width={300}
                      />
                    </div>
                  )}
                </Popper>
              </div>
            )}
            delay={[0, 100]}
            trigger="click"
            interactive
            appendTo={document.body}
          >
            <button
              className={cx("preview-emoji")}
              onClick={handlePreviewEmoji}
            >
              <Tippy
                className={cx("tool-tip")}
                content="Biểu cảm"
                delay={[200, 0]}
              >
                <FontAwesomeIcon
                  className={cx("icon-right")}
                  icon={faFaceSmile}
                />
              </Tippy>
            </button>
          </TippyHeadless>
          {/* Button send message || chosenEmoji*/}
          {newMessage || newImageMessage?.length !== 0 || newFileMessage ? (
            <button
              className={cx("send-message-btn")}
              onClick={handleSendMessage}
            >
              GỬI
            </button>
          ) : (
            <Tippy
              className={cx("tool-tip")}
              content="Gửi nhanh biểu tượng cảm xúc"
              delay={[200, 0]}
            >
              <button
                className={cx("send-message-like")}
                onClick={handleSendFlastLikeMessage}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
            </Tippy>
          )}

          {/* Show toast status */}
          <ToastContainer
            position="top-right"
            autoClose={4000}
            closeOnClick={false}
          />
        </div>

        {/* Preview upload Image and Video */}
        <div className={cx("preview-upload")}>
          {btnClosePreview && (
            <button className={cx("close-btn")} onClick={handleClosePreview}>
              <FontAwesomeIcon icon={faClose} className={cx("close-icon")} />
            </button>
          )}

          {newImageMessage.length > 0 ? (
            <div>
              {newImageMessage.map((img, index) => {
                return (
                  <>
                    {img.data.name.split(".")[
                      img.data.name.split(".").length - 1
                    ] === "mp4" ? (
                      <video
                        className={cx("image-upload")}
                        key={index}
                        src={img.preview}
                        alt="video"
                        controls
                      />
                    ) : (
                      <img
                        className={cx("image-upload")}
                        key={index}
                        src={img.preview}
                        alt="preview-img"
                      />
                    )}
                  </>
                );
              })}
            </div>
          ) : null}

          {/* file message */}
          {newFileMessage && (
            <PreviewFileMessage newFileMessage={newFileMessage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Messenger;
