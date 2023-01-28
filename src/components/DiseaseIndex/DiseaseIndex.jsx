import React from "react";
import classNames from "classnames/bind";
import styles from "./DiseaseIndex.module.scss";
const cx = classNames.bind(styles);
const DiseaseIndex = ({ name, index, percent, icon }) => {
  return (
    <div className={cx("form")}>
      <div className={cx("name")}>{name}</div>
      <div className={cx("Index")}>{index}</div>
      <div className={cx("Percent")}>
        {icon}
        {percent}
      </div>
    </div>
  );
};

export default DiseaseIndex;
