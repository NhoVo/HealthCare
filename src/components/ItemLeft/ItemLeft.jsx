import React from "react";
import classNames from "classnames/bind";
import styles from "./ItemLeft.module.scss";
import EditIcon from "@mui/icons-material/Edit";
const cx = classNames.bind(styles);

const ItemLeft = (props) => {
  return (
    <div className={cx("item")}>
      {/* <div className={cx("group-item")}> */}
      {props.children}
      {/* <EditIcon className={cx("icon")} />
        <h1>Thông tin</h1> */}
      {/* </div> */}
    </div>
  );
};

export default ItemLeft;
