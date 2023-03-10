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
  faLock,
  faMicrophone,
  faMicrophoneSlash,
  faPaperclip,
  faPhone,
  faThumbsUp,
  faVideo,
  faVideoSlash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
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
import Webcam from "react-webcam";
import images from "../../../../assets/images/index";
import MessageItem from "../../../Message/MessageItem";

const cx = classNames.bind(styles);

function Messenger({ conversationPhoneBook }) {
  const [newMessage, setNewMessage] = useState("");
  const [newImageMessage, setNewImageMessage] = useState([]);
  const [newFileMessage, setNewFileMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [btnClosePreview, setBtnClosePreview] = useState(false);
  const [previewEmoji, setPreviewEmoji] = useState(false);

  // call video
  const [openCall, setOpenCall] = useState(false);
  const [changeIconVideo, setChangeIconVideo] = useState(false);
  const [changeIconMic, setChangeIconMic] = useState(false);
  const [stream, setStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  //call video

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const scrollMessenger = useRef();

  // fetch message from conversationId

  // realtime change leader
  // useEffect(() => {
  //   socket.on("confirm_change_leader", (request) => {
  //     dispatch(
  //       listGroupUsers.actions.arrivalChangeLeaderInGroupFromSocket(request)
  //     );
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   socket.on("updated_member_in_group", (info) => {
  //     dispatch(listGroupUsers.actions.arrivalUpdatedMembersInGroup(info));
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // realtime change name conversation of group
  // useEffect(() => {
  //   socket.on("change_name_conversation_of_group", (_conversation) => {
  //     dispatch(
  //       listGroupUsers.actions.arrivalChangeNameConversationOfGroupFromSocket(
  //         _conversation
  //       )
  //     );
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  //realtime change avatar conversation of group
  // useEffect(() => {
  //   socket.on("change_avatar_conversation_of_group", (_conversation) => {
  //     dispatch(
  //       listGroupUsers.actions.arrivalChangeAvatarConversationOfGroupFromSocket(
  //         _conversation
  //       )
  //     );
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // realtime with block message user in group
  // useEffect(() => {
  //   socket.on("blocked_message_user", (arrBlocked) => {
  //     dispatch(
  //       listGroupUsers.actions.arrivalBlockMessageUserInGroupFromSocket(
  //         arrBlocked
  //       )
  //     );
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // user join room
  // useEffect(() => {
  //   socket.emit("join_room", conversation.id);
  //   socket.emit("status_user", user._id);

  //   socket.on("get_users", (users) => {
  //     // console.log('USER - ONLINE -', users);
  //     setOnlineUsers(
  //       conversation?.members.filter((member) =>
  //         users.some((us) => us.userId === member)
  //       )
  //     );
  //   });
  // }, [user._id, conversation]);

  // realtime message of receiver
  // useEffect(() => {
  //   socket.on("receiver_message", (message) => {
  //     dispatch(messagesSlice.actions.arrivalMessageFromSocket(message));
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // realtime re-call message of receiver
  // useEffect(() => {
  //   socket.on("receiver_recall_message", (message) => {
  //     dispatch(messagesSlice.actions.recallMessageFromSocket(message));
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   socket.on("me", (id) => {
  //     console.log(id);
  //   });
  // }, []);

  // call video
  // useEffect(() => {
  //   socket.on("endCallToClient", () => {
  //     console.log("ok----------------", connectionRef);
  //     setOpenCall(false);
  //     setCallEnded(true);
  //     setChangeIconVideo(false);
  //     connectionRef.current.destroy();
  //   });
  // }, []);

  const handleOpenCallVideo = () => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => {
    //     setStream(stream);
    //     myVideo.current.srcObject = stream;
    //   });
    // const peer = new Peer({
    //   initiator: true,
    //   trickle: false,
    //   stream: stream,
    // });
    // peer.on("signal", (data) => {
    //   socket.emit("callUser", {
    //     userToCall: infoConversation,
    //     signalData: data,
    //     from: infoUser._id,
    //     name: infoUser.fullName,
    //   });
    // });
    // peer.on("stream", (stream) => {
    //   console.log(stream);
    //   userVideo.current.srcObject = stream;
    // });
    // socket.on("callAccepted", (signal) => {
    //   console.log("da nge diejn", signal);
    //   setCallAccepted(true);

    //   peer.signal(signal);
    // });

    // connectionRef.current = peer;
    // setOpenCall(true);
    console.log("ok");
  };
  const handleModelCloseOpenCallVideo = () => {
    // connectionRef.current.destroy();

    // socket.emit("endCall", { id: infoConversation });
    // setOpenCall(false);
    // setCallEnded(true);
    console.log("ok");
  };

  const handleChangeIconVideo = () => {
    // const tracks = myVideo.current.srcObject.getTracks();
    // tracks.forEach((track) => track.stop());
    // myVideo.current.srcObject = null;
    // setChangeIconVideo(true);
    console.log("ok");
  };
  const handleChangeIconOpenvideo = () => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => {
    //     setStream(stream);
    //     myVideo.current.srcObject = stream;
    //   });
    // setChangeIconVideo(false);
    console.log("ok");
  };

  const handleChangeIconMic = () => {
    setChangeIconMic(true);
  };
  const handleChangeIconOpenMic = () => {
    setChangeIconMic(false);
  };

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
    // if (
    //   newFileMessage?.size / 1024 / 1024 > 5 ||
    //   newImageMessage?.size / 1024 / 1024 > 5
    // ) {
    //   toast.error(
    //     "Xin l???i, file c???a b???n v?????t qu?? 5 MB. Vui l??ng ch???n file kh??c ????? g???i!"
    //   );
    //   return;
    // }

    // dispatch(
    //   fetchApiSendMessage({
    //     conversationID: conversation.id,
    //     senderID: user._id,
    //     content: newMessage.emoji ? newMessage.emoji : newMessage,
    //     imageLinks: newImageMessage,
    //     fileLink: newFileMessage,
    //   })
    // );

    // setNewMessage("");
    // setNewImageMessage([]);
    // setNewFileMessage(null);
    // setBtnClosePreview(false);
  };

  const handleSendFlastLikeMessage = async (e) => {
    e.preventDefault();

    // dispatch(
    //   fetchApiSendMessage({
    //     conversationID: conversation.id,
    //     senderID: user._id,
    //     content: "????",
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

  // handle blocked message user
  const handleBlockedSingle = () => {
    // let choice = window.confirm(
    //   `B???n c?? ch???c ch???n mu???n ch???n tin nh???n c???a ${conversation.name} kh??ng?`
    // );
    // if (choice === true) {
    //   const data = {
    //     conversationId: conversation.id,
    //     userId: userBlock.find((block) => block !== user._id), // userBlock
    //   };
    //   dispatch(blockMember(data));
    //   toast.success(`B???n ???? ch???n tin nh???n v???i ${conversation.name}.`);
    // } else {
    //   toast.info("B???n ???? h???y ch???n tin nh???n.");
    // }
  };

  // handle un-blocked message user
  const handleUnBlockedSingle = () => {
    // let choice = window.confirm(
    //   `B???n c?? ch???c ch???n mu???n b??? ch???n tin nh???n c???a ${conversation.name} kh??ng?`
    // );
    // if (choice === true) {
    //   const data = {
    //     conversationId: conversation.id,
    //     userId: userBlock.find((block) => block !== user._id),
    //   };
    //   dispatch(cancelBlockMember(data));
    //   toast.success(`B???n ???? b??? ch???n tin nh???n v???i ${conversation.name}.`);
    // } else {
    //   toast.info(`B???n kh??ng mu???n b??? ch???n tin nh???n v???i ${conversation.name}.`);
    // }
  };

  return (
    <div className={cx("messenger")}>
      <div className={cx("messenger-header")}>
        {/* Online user (status) */}

        <OnlineStatus onlineUsers={onlineUsers} conversation={null} />

        <div>
          <Tippy
            className={cx("tool-tip")}
            content="Cu???c g???i video"
            delay={[200, 0]}
          >
            <button
              className={cx("btn-click-icon")}
              onClick={handleOpenCallVideo}
            >
              <FontAwesomeIcon className={cx("icon")} icon={faVideo} />
            </button>
          </Tippy>

          {/* block single */}
          {/* {conversation.isGroup ? null : (
            <>
              {conversation?.blockBy?.includes(
                userBlock.find((block) => block !== user._id)
              ) ? (
                <button
                  className={cx("un-blocked-single")}
                  onClick={handleUnBlockedSingle}
                >
                  B??? ch???n
                </button>
              ) : (
                <Tippy
                  className={cx("tool-tip")}
                  content={`Ch???n tin nh???n c???a ${conversation.name}`}
                  delay={[200, 0]}
                >
                  <button
                    className={cx("blocked-single")}
                    onClick={handleBlockedSingle}
                  >
                    <FontAwesomeIcon icon={faLock} />
                  </button>
                </Tippy>
              )}
            </>
          )} */}
        </div>
      </div>
      {/* Call video */}

      {/* <ModelWrapper
        className={cx("model-add-friend")}
        open={openCall}
        onClose={handleModelCloseOpenCallVideo}
      >
        <div className={cx("model-add-group-bg")}>
          <div className={cx("add-friend-title")}>
            <span className={cx("friend-title")}>
              Me.Chat Call - {userCurrent?.fullName}
            </span>
            <button className={cx("close-btn-close-video-call")}>
              <FontAwesomeIcon
                className={cx("friend-close-ic")}
                icon={faXmark}
                onClick={handleModelCloseOpenCallVideo}
              />
            </button>
          </div>
          <div className={cx("camera-callVideo")}>
            <div className={cx("video-container")}>
              {callAccepted && !callEnded ? (
                <>
                  <div className={cx("video")}>
                    {stream && (
                      <Webcam
                        className={cx("video-webcam-2")}
                        playsInline
                        ref={myVideo}
                        autoPlay
                      />
                    )}
                    {stream && (
                      <Webcam
                        className={cx("video-webcam-2")}
                        playsInline
                        ref={userVideo}
                        autoPlay
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className={cx("video")}>
                  {stream && !changeIconVideo ? (
                    <div className={cx("avatar-backgroud")}>
                      <Webcam
                        className={cx("video-webcam")}
                        playsInline
                        ref={myVideo}
                        autoPlay
                      />

                      <div className={cx("avatar-sub")}>
                        <img
                          className={cx("avatar-img-sub")}
                          src={
                            userCurrent?.avatarLink
                              ? userCurrent?.avatarLink
                              : images.noImg
                          }
                          alt="avatar"
                        />
                      </div>
                      <div className={cx("user-call")}>??ang ????? chu??ng ...</div>
                    </div>
                  ) : (
                    <div className={cx("avatar-backgroud")}>
                      <img
                        className={cx("avatar-img")}
                        src={
                          infoUser?.avatarLink
                            ? infoUser?.avatarLink
                            : images.noImg
                        }
                        alt="avatar"
                      />

                      <div className={cx("avatar-sub")}>
                        <img
                          className={cx("avatar-img-sub")}
                          src={
                            userCurrent?.avatarLink
                              ? userCurrent?.avatarLink
                              : images.noImg
                          }
                          alt="avatar"
                        />
                      </div>
                      <div className={cx("user-call")}>??ang ????? chu??ng ...</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={cx("footer-callVideo")}>
            {!changeIconVideo ? (
              <FontAwesomeIcon
                className={cx("footer-callVideo-icon-2")}
                icon={faVideo}
                onClick={handleChangeIconVideo}
              />
            ) : (
              <FontAwesomeIcon
                className={cx("footer-callVideo-icon-2")}
                icon={faVideoSlash}
                onClick={handleChangeIconOpenvideo}
              />
            )}

            <div className={cx("footer-icon")}>
              <FontAwesomeIcon
                className={cx("footer-callVideo-icon")}
                icon={faPhone}
                onClick={handleModelCloseOpenCallVideo}
              />
            </div>

            {!changeIconMic ? (
              <FontAwesomeIcon
                className={cx("footer-callVideo-icon-3")}
                icon={faMicrophone}
                onClick={handleChangeIconMic}
              />
            ) : (
              <FontAwesomeIcon
                className={cx("footer-callVideo-icon-3")}
                icon={faMicrophoneSlash}
                onClick={handleChangeIconOpenMic}
              />
            )}
          </div>
        </div>
      </ModelWrapper> */}

      {/* onScroll={handleLoadingMessagesLast} */}
      <div className={cx("messenger-body")}>
        {/* Messages */}
        {
          false ? <CircularProgress className={cx("loading-messages")} /> : null
          // <>
          //   {listMessage.map((message) => {
          //     return (
          //       <div key={message?._id} ref={scrollMessenger}>
          //         <Message
          //           message={message}
          //           own={message?.senderID === user?._id}
          //           conversation={conversation}
          //           // user={user}
          //         />
          //       </div>
          //     );
          //   })}
          // </>
        }
      </div>

      {/* Message conversation */}
      {false ? (
        <>
          {false ? (
            <div className={cx("Block")}>
              <h2>B???n ???? b??? ch???n nh???n tin b???i Tr?????ng nh??m...</h2>
            </div>
          ) : (
            <div className={cx("Block")}>
              <h2>B???n ???? b??? ch???n nh???n tin b???i ...</h2>
            </div>
          )}
        </>
      ) : (
        <>
          <div className={cx("messenger-footer")}>
            <div className={cx("toolbar-on-chat-input")}>
              {/* option image */}
              <label htmlFor="file">
                <div className={cx("option-image-icon")}>
                  <Tippy
                    className={cx("tool-tip")}
                    content="G???i h??nh ???nh ho???c video"
                    delay={[200, 0]}
                  >
                    <FontAwesomeIcon
                      className={cx("option-icon")}
                      icon={faImage}
                    />
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
                            Ch???n File
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
                          G???i File t??? Google Driver
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
                  content="????nh k??m File"
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
                placeholder="Nh???p tin nh???n ..."
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
                    content="Bi???u c???m"
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
              {newMessage || newImageMessage.length !== 0 || newFileMessage ? (
                <button
                  className={cx("send-message-btn")}
                  onClick={handleSendMessage}
                >
                  G???I
                </button>
              ) : (
                <Tippy
                  className={cx("tool-tip")}
                  content="G???i nhanh bi???u t?????ng c???m x??c"
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
                <button
                  className={cx("close-btn")}
                  onClick={handleClosePreview}
                >
                  <FontAwesomeIcon
                    icon={faClose}
                    className={cx("close-icon")}
                  />
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
        </>
      )}
    </div>
  );
}

export default Messenger;
