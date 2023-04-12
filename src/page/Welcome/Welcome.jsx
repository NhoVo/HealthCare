import classNames from "classnames/bind";
import React from "react";
import { Link } from "react-router-dom";
import FormPage from "../../components/FormPage/FormPage";
import styles from "./Welcome.module.scss";
import image from "../../assets/images/index";
import Lottie from "lottie-react";
const cx = classNames.bind(styles);
const Welcome = () => {
  return (
    <FormPage>
      <div className={cx("title")}>CadioCare</div>
      <div className={cx("separator")}></div>
      <div className={cx("slogan")}>Tận tâm chia sẻ – vì sức khỏe của bạn</div>
      <div className={cx("form-animation")}>
        <Lottie
          animationData={image.logoWellCome} // đường dẫn đến tệp JSON của animation
          loop
          autoplay
          className={cx("animation")}
        />
      </div>
      <Link to="/Login">
        <button type="button" className={cx("button-login")}>
          ĐĂNG NHẬP
        </button>
      </Link>
      <div className={cx("register")}>
        <div className={cx("title-register")}>
          Đăng ký tài khoản dành cho bác sĩ?&nbsp;&nbsp;
          <Link to="/RegisterDoctor">
            <u>Đăng ký tài khoản bác sĩ</u>
          </Link>
        </div>
        <div className={cx("title-register")}>
          Đăng ký tài khoản dành cho bệnh nhân?&nbsp;&nbsp;
          <Link to="/ResisterPatient">
            <u>Đăng ký tài khoản bệnh nhân</u>{" "}
          </Link>
        </div>
      </div>
    </FormPage>
  );
};

export default Welcome;
