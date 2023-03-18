import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ChatHome.module.scss";
import Sidebar from "../../components/LayoutChat/Sidebar/Sidebar";
import Center from "../../components/LayoutChat/Middle/Middle";
import Rightbar from "../../components/LayoutChat/Rightbar/Rightbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversation } from "../../Redux/Features/Conversation/Conversation";
import { userLogin } from "../../Redux/selector";
import useDebounce from "../../components/hooks/useDebounce";
import { fetchLoginSlice } from "../../Redux/Features/Users/UserLoginSlice";
const cx = classNames.bind(styles);
const ChatHome = () => {
  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  console.log(user);
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
