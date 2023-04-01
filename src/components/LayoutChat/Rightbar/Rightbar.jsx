// libs
import classNames from "classnames/bind";

// me
import { useSelector } from "react-redux";
import images from "../../../assets/images/index";
import { listAllConversation } from "../../../Redux/selector";
import ConversationInfo from "./ConversationInfo/ConversationInfo";
import Messenger from "./Messenger/Messenger";
import styles from "./Rightbar.module.scss";

const cx = classNames.bind(styles);

function Rightbar({ peer }) {
  const listConversation = useSelector(listAllConversation);
  return (
    <div className={cx("wrapper")}>
      {/* Để show ra Chat current -> get theo conversationId */}
      {listConversation ? (
        <div className={cx("container")}>
          <Messenger peer={peer} />
          <ConversationInfo />
        </div>
      ) : (
        <div className={cx("container-messages")}>
          <div className={cx("intro")}>
            <span className={cx("title")}>
              Chào mừng đến với <b>MeChat PC!</b>
            </span>
            <p className={cx("description")}>
              Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người
              thân, bạn bè được tối ưu hóa trên máy tính của bạn.
            </p>
            <div className={cx("slide-bar-img")}>
              <img className={cx("logo-img")} src={images.logo} alt="Logo" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rightbar;
