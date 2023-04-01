// libs
import classNames from "classnames/bind";

// me
import styles from "./Middle.module.scss";
// import Conversation from "~/components/Conversation";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllmessage } from "../../../Redux/Features/Conversation/Conversation";
import { listAllConversation } from "../../../Redux/selector";
import Conversation from "../../Conversation/Conversation";
import Search from "../../SearchChat/Search";

const cx = classNames.bind(styles);

function Middle() {
  const listConversation = useSelector(listAllConversation);
  const dispatch = useDispatch();
  const handleChat = (conversation) => {
    dispatch(fetchAllmessage(conversation.id));
  };
  return (
    <div className={cx("wrapper")}>
      {/* search */}
      <div className={cx("search-info")}>
        <Search />
      </div>

      {/* Option */}
      <div className={cx("option")}></div>

      {/* hr */}
      <div className={cx("separator")}></div>

      {/* Conversation */}
      <div className={cx("conversations")}>
        <>
          {listConversation?.length > 0 ? (
            listConversation.map((conversation, index) => {
              return (
                <>
                  <div
                    key={conversation.id}
                    onClick={() => handleChat(conversation)}
                  >
                    <Conversation
                      key={conversation.id + index}
                      conversation={conversation}
                    />
                  </div>
                </>
              );
            })
          ) : (
            <p className={cx("conversation-none")}>
              Bạn chưa có cuộc trò chuyện nào. Bạn có thể kết bạn để trò chuyện
              trực tuyến trên <b> Mechat</b>.
            </p>
          )}
        </>
      </div>
    </div>
  );
}

export default Middle;
