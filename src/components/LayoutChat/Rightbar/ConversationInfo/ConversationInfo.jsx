// libs
import {
  faCamera,
  faCaretDown,
  faClock,
  faNoteSticky,
  faPenToSquare,
  faRightFromBracket,
  faTrash,
  faUserGroup,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBackIos } from "@material-ui/icons";
import classNames from "classnames/bind";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// me
import images from "../../../../assets/images/index";
import ItemStored from "../../../ItemStored/ItemStored";
import styles from "./ConversationInfo.module.scss";
import { useSelector } from "react-redux";
import {
  listAllConversation,
  listAllMessage,
  userLogin,
} from "../../../../Redux/selector";
import { useEffect } from "react";
import ModelWrapper from "../../../ModelWrapper/ModelWrapper";
import FileMessage from "../../../FileMessage/FileMessage";

const cx = classNames.bind(styles);

function ConversationInfo() {
  //xem lại chỗ này

  const [show, setShow] = useState(true);
  const [showAddMembers, setShowAddMembers] = useState(true);
  const [showFile, setShowFile] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const [modelChangeName, setModelChangeName] = useState(false);
  const [showImg, setShowImg] = useState();
  const [changeNameGroup, setChangeNameGroup] = useState("");
  const listMessages = useSelector(listAllMessage);
  const user = useSelector(userLogin);
  const listConversation = useSelector(listAllConversation);
  const conversation = listConversation?.filter(
    (user) => user?.id === listMessages[0]?.conversationId
  );
  const userloggin = user.role === "DOCTOR" ? user.doctor : user;
  const infoConversation =
    userloggin?.id === conversation[0]?.member[0].user.id
      ? conversation[0]?.member[1]
      : conversation[0]?.member[0];

  console.log(userloggin);
  console.log(infoConversation);

  console.log("bs", conversation);

  const handleOpen = () => {
    setShow(false);
    setShowFile(true);
  };

  const handleClose = () => {
    setShow(true);
    setShowAddMembers(true);
    setShowAddMembers(true);
  };

  //file
  const handleOpenFile = () => {
    setShow(false);
    setShowFile(false);
  };
  const handleShowPreviewImageAndVideo = (e) => {
    setShowPreview(!showPreview);
    setShowImg(e.target.src);
  };

  // hide preview
  const handleHidePreviewImageAndVideo = () => {
    setShowPreview(false);
  };

  // mo dong model doi ten nhom

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h2 className={cx("title-name")}>Thông tin hội thoại</h2>
        <div className={cx("separator")}></div>
        <div className={cx("info")}>
          <div className={cx("info-avatar")}>
            {/* conversation.createdBy!== null */}

            <img className={cx("avatar")} src={images?.logo} alt="avatar" />
          </div>
          <div className={cx("info-name")}>
            <h3 className={cx("name")}>{infoConversation?.user?.fullName}</h3>
          </div>
        </div>
        <div className={cx("separator")}></div>
        {/* Image and Video */}
        <div className={cx("list-image")}>
          <div className={cx("header")}>
            <span className={cx("header-title")}>Ảnh/ Video</span>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretDown} />
          </div>
          <div className={cx("body")}>
            <div className={cx("body-list-image")}>
              {listMessages.map((message) => {
                return (
                  <div key={message._id}>
                    {message.typeMessage === "VIDEO" ? (
                      <video
                        controls
                        className={cx("item-image")}
                        src={message?.file[0].url}
                        alt="img"
                      />
                    ) : (
                      <>
                        {message.typeMessage === "IMAGE" ? (
                          <>
                            {message.file?.length > 1 ? (
                              <>
                                {message?.content && (
                                  <p className={cx("message-top-text")}>
                                    {message?.content}
                                  </p>
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
                                          className={cx("item-image")}
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
                                  <p className={cx("message-top-text")}>
                                    {message?.content}
                                  </p>
                                )}
                                <button
                                  className={cx("preview-image")}
                                  onClick={handleShowPreviewImageAndVideo}
                                >
                                  <img
                                    className={cx("item-image")}
                                    src={message?.file[0]?.url}
                                    alt="img"
                                  />
                                </button>
                              </>
                            )}
                          </>
                        ) : null}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={cx("footer")}>
            <button className={cx("footer-btn-all")} onClick={handleOpen}>
              Xem tất cả
            </button>
          </div>
        </div>

        <div className={cx("separator")}></div>
        {/* ------------------------------------------------------ */}
        <div className={cx("list-item-stored")}>
          <div className={cx("header")}>
            <span className={cx("header-title")}>File</span>
            <FontAwesomeIcon className={cx("icon")} icon={faCaretDown} />
          </div>
          <div className={cx("body")}>
            {/* render image (map) after */}
            <div className={cx("body-list-item-stored")}>
              <div className={cx("right-container")}>
                {listMessages.map((message) => {
                  return (
                    <div key={message._id}>
                      {message.typeMessage === "FILE" ? (
                        <FileMessage message={message} className={cx("file")} />
                      ) : null}
                    </div>
                  );
                })}
              </div>
              {/* </div> */}
            </div>
          </div>
          <div className={cx("footer")}>
            <button className={cx("footer-btn-all")} onClick={handleOpenFile}>
              Xem tất cả
            </button>
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        <div className={cx("separator")}></div>
        {/* Link */}
        <ItemStored isLink />
        <div className={cx("separator")}></div>
        {/* conversation.isGroup */}

        <button className={cx("btn-click-footer")}>
          <FontAwesomeIcon
            className={cx("item")}
            icon={faTrash}
            // onClick={handleModelOpenAddGroup}
          />
          <label>Xóa lịch sử cuộc trò chuyện</label>
        </button>
      </div>

      {/* Show toast status */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick={false}
      />
    </div>
  );
}

export default ConversationInfo;
