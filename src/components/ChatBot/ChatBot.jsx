import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ChatBot.module.scss";
import images from "../../assets/images/index";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MicIcon from "@mui/icons-material/Mic";
import TippyHeadless from "@tippyjs/react/headless";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { faComment, faComments } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const ChatBot = () => {
  const [openIntroVersion, setOpenIntroVersion] = useState(false);
  const handleModelOpenIntroVersion = () => {
    setOpenIntroVersion(true);
  };
  const handleModelCloseIntroVersion = () => {
    setOpenIntroVersion(false);
  };
  return (
    <div className={cx("ChatBot")}>
      <FontAwesomeIcon
        className={cx("icon-chat")}
        icon={faComments}
        onClick={
          openIntroVersion === false
            ? handleModelOpenIntroVersion
            : handleModelCloseIntroVersion
        }
      />
      {/* <img
        src={images.chatbox}
        alt=""
        onClick={
          openIntroVersion === false
            ? handleModelOpenIntroVersion
            : handleModelCloseIntroVersion
        }
      /> */}
      {openIntroVersion === true ? (
        <div className={cx("chatbox")}>
          <div className={cx("chatbox")}>
            <div className={cx("chatbox__support")}>
              <div className={cx("chatbox__header")}>
                <div className={cx("chatbox__image--header")}>
                  <img src={images.logo} alt="" />
                </div>
                <div className={cx("chatbox__content--header")}>
                  <h4 className={cx("chatbox__heading--header")}>
                    N&S HealthCase
                  </h4>
                  <p className={cx("chatbox__description--header")}>
                    Tận tâm chia sẻ – vì sức khỏe của bạn
                  </p>
                </div>
              </div>
              <div className={cx("chatbox__messages")}>
                <div>
                  <div className={cx("messages__item")}>
                    <div className={cx("messages__item--visitor")}>
                      Chào mừng bạn đến với N&S HealthCase
                    </div>
                  </div>
                  <div className={cx("messages__item")}>
                    <div className={cx("messages__item--visitor")}>
                      Mình có thể hỗ trợ bạn thông tin gì?
                    </div>
                  </div>
                  <div className={cx("messages__item--operator")}>
                    <div>Sure!</div>
                  </div>
                  <div className={cx("messages__item")}>
                    <div className={cx("messages__item--visitor")}>
                      Need your help, I need a developer in my site.
                    </div>
                  </div>
                  <div className={cx("messages__item--operator")}>
                    <div>Hi... What is it? I'm a front-end developer, yay!</div>
                  </div>
                  <div className={cx("messages__item--operator")}>
                    <div>Hi... What is it? I'm a front-end developer, yay!</div>
                  </div>
                  <div className={cx("messages__item--operator")}>
                    <div>Hi... What is it? I'm a front-end developer, yay!</div>
                  </div>
                  <div className={cx("messages__item--operator")}>
                    <div>Hi... What is it? I'm a front-end developer, yay!</div>
                  </div>

                  <div className={cx("messages__item")}>
                    <div className={cx("messages__item--typing")}>
                      <span className={cx("messages__dot")}></span>
                      <span className={cx("messages__dot")}></span>
                      <span className={cx("messages__dot")}></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("chatbox__footer")}>
                <InsertEmoticonIcon sx={{ fontSize: 20 }} />
                <MicIcon sx={{ fontSize: 20 }} />
                <input type="text" placeholder="Write a message..." />
                <p className={cx("chatbox__send--footer")}>Gửi</p>
                <AttachFileIcon sx={{ fontSize: 20 }} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ChatBot;
