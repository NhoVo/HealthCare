// libs
import classNames from "classnames/bind";
import { useEffect } from "react";

import { CircularProgress } from "@material-ui/core";

// me
import styles from "./Middle.module.scss";
// import Conversation from "~/components/Conversation";
import Search from "../../SearchChat/Search";
import Conversation from "../../Conversation/Conversation";
import { useDispatch, useSelector } from "react-redux";
import { listAllConversation, userLogin } from "../../../Redux/selector";
import { fetchAllmessage } from "../../../Redux/Features/Conversation/Conversation";

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
