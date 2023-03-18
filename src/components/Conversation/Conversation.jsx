// libs
import classNames from "classnames/bind";
import { format } from "timeago.js";
import { MoreHoriz } from "@material-ui/icons";
import { faEllipsis, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import TippyHeadless from "@tippyjs/react/headless";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// me
import styles from "./Conversation.module.scss";
import Popper from "../Popper/Popper";

import ModelInfoAccount from "../ModelWrapper/ModelInfoAccount/ModelInfoAccount";
import { useEffect, useState } from "react";
import images from "../../assets/images/index";
import { userLogin } from "../../Redux/selector";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

function Conversation({ conversation, isPhoneBook, Group, conversationInfo }) {
  const user = useSelector(userLogin);

  //listMeRequest.filter((friend) => friend.receiverId.includes(phoneNumber._id))
  return (
    <>
      {conversation.member.map((m) => {
        if (m.user.id !== user?.doctor?.id && m.user.id !== user?.id) {
          return (
            <div className={cx("container-conversation")} key={conversation.id}>
              <div className={cx("list-conversation")}>
                {/*onClick={tam}  */}
                <img
                  className={cx("avatar-img")}
                  // src={conversation?.imageLinkOfConver}
                  src={images.logo}
                  alt="avatar"
                />

                <div className={cx("content")}>
                  {/* {conversation?.name}  */}
                  <h4 className={cx("username")}>{m.user.fullName}</h4>
                  <p className={cx("message")}>
                    {conversation?.lastMessage?.content}
                  </p>
                </div>

                <div className={cx("notification")}>
                  <span className={cx("time")}>
                    {format(conversation?.time)}
                  </span>
                </div>
              </div>
            </div>
          );
        }
      })}

      {/* Show toast status */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick={false}
      />
    </>
  );
}

export default Conversation;
