import classNames from "classnames/bind";
import styles from "./FormPage.module.scss";
import React from "react";

const cx = classNames.bind(styles);
const FormPage = (props) => {
  return <div className={cx("body")}>{props.children}</div>;
};

export default FormPage;
