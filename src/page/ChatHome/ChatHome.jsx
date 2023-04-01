import classNames from "classnames/bind";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../components/hooks/useDebounce";
import Center from "../../components/LayoutChat/Middle/Middle";
import Rightbar from "../../components/LayoutChat/Rightbar/Rightbar";
import Sidebar from "../../components/LayoutChat/Sidebar/Sidebar";
import { fetchConversation } from "../../Redux/Features/Conversation/Conversation";
import { fetchLoginSlice } from "../../Redux/Features/Users/UserLoginSlice";
import { userLogin } from "../../Redux/selector";
import styles from "./ChatHome.module.scss";
const cx = classNames.bind(styles);
const ChatHome = () => {
  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  const debouncedValue = useDebounce(user, 500);
  useEffect(() => {
    dispatch(fetchLoginSlice());
  }, []);
  useEffect(() => {
    dispatch(fetchConversation());
  }, [user, debouncedValue]);
  return (
    <div className={cx("wrapper")}>
      <Sidebar />
      <Center />
      <Rightbar />
    </div>
  );
};

export default ChatHome;
