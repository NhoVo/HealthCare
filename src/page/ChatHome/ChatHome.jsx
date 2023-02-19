import React from "react";
import classNames from "classnames/bind";
import styles from "./ChatHome.module.scss";
import Sidebar from "../../components/LayoutChat/Sidebar/Sidebar";
import Center from "../../components/LayoutChat/Middle/Middle";
import Rightbar from "../../components/LayoutChat/Rightbar/Rightbar";
const cx = classNames.bind(styles);
const ChatHome = () => {
  return (
    <div className={cx("wrapper")}>
      <Sidebar />
      <Center />
      <Rightbar />
    </div>
  );
};

export default ChatHome;
