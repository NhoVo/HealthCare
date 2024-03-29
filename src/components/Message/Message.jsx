// libs
import Tippy from "@tippyjs/react";
import TippyHeadless from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import moment from "moment";

import "tippy.js/dist/tippy.css";

import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsis,
  faRepeat,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popper from "../Popper/Popper";
import styles from "./Message.module.scss";
import MessageItem from "./MessageItem";

const cx = classNames.bind(styles);

function Message({ message, own, conversation }) {
  return (
    <>
      {own ? (
        <div className={cx("own")}>
          <div className={cx("message-top")}>
            {/* Menu parent */}
            <TippyHeadless
              render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                  <Popper className={cx("own-menu-list")}>
                    <div className={cx("options")}>
                      {/* Menu children */}
                      <TippyHeadless
                        render={(attrs) => (
                          <div tabIndex="-1" {...attrs}>
                            <Popper className={cx("own-menu-list-children")}>
                              <button className={cx("options-children-btn")}>
                                <FontAwesomeIcon
                                  className={cx("recall-icon")}
                                  icon={faRepeat}
                                />
                                Thu hồi
                              </button>
                              <button className={cx("options-children-btn")}>
                                <FontAwesomeIcon
                                  className={cx("recall-icon")}
                                  icon={faTrash}
                                />
                                Xóa
                              </button>
                            </Popper>
                          </div>
                        )}
                        interactive
                        trigger="click"
                        placement="bottom-start"
                        offset={[4, 4]}
                      >
                        <Tippy
                          className={cx("tool-tip")}
                          content="Thêm"
                          delay={[200, 0]}
                        >
                          <button className={cx("option-btn")}>
                            <FontAwesomeIcon
                              className={cx("option-icon")}
                              icon={faEllipsis}
                            />
                          </button>
                        </Tippy>
                      </TippyHeadless>
                    </div>
                    {/* Button like (:hover) */}
                    <button className={cx("option-btn")}>
                      <FontAwesomeIcon
                        className={cx("like-icon")}
                        icon={faThumbsUp}
                      />
                    </button>
                  </Popper>
                </div>
              )}
              interactive
              placement="bottom-end"
              offset={[-90, -18]} // -74, -18
              delay={[200, 100]}
              appendTo={() => document.body}
            >
              {/* render message (sender) */}
              <div className={cx("display-container")}>
                {message?.action ? (
                  <div className={cx("display-action")}>
                    <p className={cx("text-action")}>
                      {message?.action} lúc:
                      {moment(message.createdAt).format("h:mm a - DD/MM/YYYY")}
                    </p>
                  </div>
                ) : (
                  <div className={cx("display-action-none")}>
                    <div className={cx("display-group-preview-image")}>
                      <MessageItem message={message} own={own} />
                    </div>

                    <img
                      className={cx("message-top-img")}
                      // src={message.user.avatarLink}
                      src={message.user.avatar}
                      alt="avatar"
                    />
                  </div>
                )}
              </div>
            </TippyHeadless>
          </div>
          {!message?.action && (
            <span className={cx("message-bottom")}>
              {moment(message.createdAt).format("h:mm a")}
            </span>
          )}
        </div>
      ) : (
        <div className={cx("wrapper")}>
          <div className={cx("message-top")}>
            {/* Menu parent */}
            <TippyHeadless
              render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                  <Popper className={cx("own-menu-list")}>
                    <div className={cx("options")}>
                      {/* Menu children */}
                      <TippyHeadless
                        render={(attrs) => (
                          <div tabIndex="-1" {...attrs}>
                            <Popper className={cx("own-menu-list-children")}>
                              <div className={cx("separator")}></div>
                              <button className={cx("options-children-btn")}>
                                <FontAwesomeIcon
                                  className={cx("recall-icon")}
                                  icon={faRepeat}
                                />
                                Thu hồi
                              </button>
                              <button className={cx("options-children-btn")}>
                                <FontAwesomeIcon
                                  className={cx("recall-icon")}
                                  icon={faTrash}
                                />
                                Xóa
                              </button>
                            </Popper>
                          </div>
                        )}
                        interactive
                        trigger="click"
                        placement="bottom-start"
                        offset={[-2, 4]}
                      >
                        <Tippy
                          className={cx("tool-tip")}
                          content="Thêm"
                          delay={[200, 0]}
                        >
                          <button className={cx("option-btn")}>
                            <FontAwesomeIcon
                              className={cx("option-icon")}
                              icon={faEllipsis}
                            />
                          </button>
                        </Tippy>
                      </TippyHeadless>
                    </div>
                  </Popper>
                </div>
              )}
              interactive
              placement="bottom-start"
              offset={[90, -20]} // 74, -18
              delay={[200, 100]}
              appendTo={() => document.body}
            >
              {/* render message (sender) */}
              <div className={cx("display-container")}>
                {message?.action ? (
                  <div className={cx("display-action")}>
                    <p className={cx("text-action")}>
                      {message?.action} lúc:
                      {moment(message.createdAt).format("h:mm a - DD/MM/YYYY")}
                    </p>
                  </div>
                ) : (
                  <div className={cx("display-action-none-receiver")}>
                    <img
                      className={cx("message-top-img")}
                      src={message.user.avatar}
                      alt="avatar"
                    />
                    <div>
                      <div
                        className={cx("display-group-preview-image-receiver")}
                      >
                        <MessageItem message={message} own={own} />
                      </div>
                      {/* )} */}
                    </div>
                  </div>
                )}
              </div>
            </TippyHeadless>
          </div>
          {!message?.action && (
            <span className={cx("message-bottom-left")}>
              {moment(message?.createdAt).format("h:mm a")}
            </span>
          )}
        </div>
      )}
    </>
  );
}

export default Message;
