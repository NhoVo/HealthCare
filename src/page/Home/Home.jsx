import React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Left from "../../components/Layout/Left/Left";
import Middle from "../../components/Layout/middle/Middle";
const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("container-fluid")}>
      <div className={cx("row")}>
        <div className={cx("col-3")}>
          <Left />
        </div>
        {/* bg-info */}
        <div className={cx("col-9")}>
          <Middle />
        </div>
      </div>
    </div>
  );
};

export default Home;
