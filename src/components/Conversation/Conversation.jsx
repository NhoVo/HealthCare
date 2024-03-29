// libs
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "timeago.js";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";

// me
import styles from "./Conversation.module.scss";
import { userLogin } from "../../Redux/selector";
const cx = classNames.bind(styles);

function Conversation({ conversation }) {
  const user = useSelector(userLogin);

  return (
    <>
      {conversation.member.map((m) => {
        if (m.user.id !== user?.doctor?.id && m.user.id !== user?.id) {
          return (
            <div className={cx("container-conversation")} key={conversation.id}>
              <div className={cx("list-conversation")}>
                <img
                  className={cx("avatar-img")}
                  src={m?.user?.avatar}
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
