import classNames from "classnames/bind";
import React from "react";
import styles from "./ItemLeft.module.scss";
const cx = classNames.bind(styles);

const ItemLeft = (props) => {
  return <div className={cx("item")}>{props.children}</div>;
};

export default ItemLeft;
