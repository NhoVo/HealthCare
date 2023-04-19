import React from "react";
import classNames from "classnames/bind";
import styles from "./DiseaseIndex.module.scss";
const cx = classNames.bind(styles);
const DiseaseIndex = ({ name, index, BMI, HA, CHOLE, GLU, TIM, TT, icon }) => {
  return (
    <>
      {BMI && (
        <div className={cx("form")}>
          <div className={cx("nameBMI")}>{name}</div>
          <div className={cx("indexBMI")}>{index}</div>
        </div>
      )}
      {HA && (
        <div className={cx("form")}>
          <div className={cx("nameHA")}>{name}</div>
          <div className={cx("indexHA")}>{index}</div>
        </div>
      )}
      {CHOLE && (
        <div className={cx("form")}>
          <div className={cx("nameCHOLE")}>{name}</div>
          <div className={cx("indexCHOLE")}>{index}</div>
        </div>
      )}
      {GLU && (
        <div className={cx("form")}>
          <div className={cx("nameGLU")}>{name}</div>
          <div className={cx("indexGLU")}>{index}</div>
        </div>
      )}
      {TIM && (
        <div className={cx("form")}>
          <div className={cx("nameTIM")}>{name}</div>
          <div className={cx("indexTIM")}>{index}</div>
        </div>
      )}
      {TT && (
        <div className={cx("form")}>
          <div className={cx("nameTT")}>{name}</div>
          <div className={cx("indexTT")}>{index}</div>
          <div className={cx("Percent")}>{icon}</div>
        </div>
      )}
    </>
  );
};

export default DiseaseIndex;
