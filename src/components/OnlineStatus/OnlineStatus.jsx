// lib
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

// me
import images from "../../assets/images/index";
import styles from "./OnlineStatus.module.scss";
const cx = classNames.bind(styles);

function OnlineStatus({ onlineUsers, conversation }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  // fetch api friends
  // useEffect(() => {
  //   setFriends(listFriends);
  // }, [listFriends]);

  // handle online friends
  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);

  return (
    <>
      {onlineFriends.length > 0 && !conversation.isGroup ? (
        onlineFriends.map((onlineFriend) => {
          return (
            <div className={cx("container")} key={onlineFriend._id}>
              <div className={cx("status")}>
                <img
                  className={cx("avatar-image-status-online")}
                  // src={onlineFriend.imageLinkOfConver}
                  src={onlineFriend.images.logo}
                  alt=""
                />
                <div className={cx("badge")}></div>
              </div>
              <div className={cx("info")}>
                <h3 className={cx("username")}>{onlineFriend.name}</h3>
                <span className={cx("time-online")}>Vừa mới truy cập</span>
              </div>
            </div>
          );
        })
      ) : (
        <>
          <img
            className={cx("avatar-image")}
            // src={conversation.imageLinkOfConver}
            src={images.logo}
            alt=""
          />
          <div className={cx("info")}>
            {/* {conversation.name} */}
            <h3 className={cx("username")}>
              {conversation[0]?.user?.fullName}
            </h3>
            <span className={cx("time-online")}>Offline</span>
          </div>
        </>
      )}
    </>
  );
}

export default OnlineStatus;
