import classNames from "classnames/bind";
import React from "react";
import styles from "./Button.module.scss";
const cx = classNames.bind(styles);
const Button = (props) => {
  return <button className={cx("btn-login")}>{props.children}</button>;
};
export default Button;
