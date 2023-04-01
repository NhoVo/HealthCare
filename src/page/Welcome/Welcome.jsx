import classNames from "classnames/bind";
import React from "react";
import { Link } from "react-router-dom";
import FormPage from "../../components/FormPage/FormPage";
import styles from "./Welcome.module.scss";
const cx = classNames.bind(styles);
const Welcome = () => {
  return (
    <FormPage>
      <div className={cx("title")}>N&S HealthCase</div>
      <div className={cx("separator")}></div>
      <div className={cx("slogan")}>Tận tâm chia sẻ – vì sức khỏe của bạn</div>
      <Link to="/Login">
        <button type="button" className={cx("button-login")}>
          ĐĂNG NHẬP
        </button>
      </Link>
      <div className={cx("register")}>
        <div className={cx("title-register")}>
          Đăng ký tài khoản dành cho bác sĩ?
          <Link to="/RegisterDoctor">
            <u>Đăng ký tài khoản bác sĩ</u>
          </Link>
        </div>
        <div className={cx("title-register")}>
          Đăng ký tài khoản dành cho bệnh nhân?
          <Link to="/ResisterPatient">
            <u>Đăng ký tài khoản bệnh nhân</u>{" "}
          </Link>
        </div>
      </div>
    </FormPage>
  );
};

export default Welcome;
