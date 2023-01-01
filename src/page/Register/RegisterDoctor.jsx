import React from "react";

import classNames from "classnames/bind";
import styles from "./RegisterDoctor.module.scss";
import FormPage from "../../components/FormPage/FormPage";
import { PhoneIphone } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import PersonIcon from "@mui/icons-material/Person";
const cx = classNames.bind(styles);
const RegisterDoctor = () => {
  return (
    <FormPage>
      <div className={cx("container")}>
        <div className={cx("row")}>
          <div
            className={cx(
              "offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3"
            )}
          >
            <div className={cx("panel-border")}>
              <div className={cx("panel-heading")}>
                <h3 className={cx("pt-3 font-weight-bold")}>
                  Đăng Ký Tài Khoản Bác Sĩ
                </h3>
              </div>
              <div className={cx("panel-body p-3")}>
                <form action="login_script.php" method="POST">
                  <div className={cx("form-group py-2")}>
                    <div className={cx("input-field")}>
                      <PhoneIphone color="primary" sx={{ fontSize: 30 }} />
                      <TextInput
                        id="outlined-helperText"
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại..."
                      />
                    </div>
                  </div>
                  <div className={cx("form-group py-2")}>
                    <div className={cx("input-field")}>
                      <PersonIcon color="primary" sx={{ fontSize: 30 }} />
                      <TextInput
                        id="outlined-helperText"
                        label="Họ và tên"
                        placeholder="Nhập họ và tên..."
                      />
                    </div>
                  </div>
                  <div className={cx("form-group py-1 pb-2")}>
                    <div className={cx("input-field")}>
                      <LockIcon color="primary" sx={{ fontSize: 30 }} />
                      <TextInput
                        id="outlined-password-input"
                        type="password"
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu..."
                      />
                    </div>
                  </div>
                  <div className={cx("form-group py-1 pb-2")}>
                    <div className={cx("input-field")}>
                      <LockIcon color="primary" sx={{ fontSize: 30 }} />
                      <TextInput
                        id="outlined-password-input"
                        type="password"
                        label="Nhập lại mật khẩu"
                        placeholder="Nhập lại mật khẩu..."
                      />
                    </div>
                  </div>
                  <Link to="/ConfirmOTP">
                    <Button>Đăng Ký</Button>
                  </Link>
                  <Link to="/Login">
                    <div className={cx("back")}>
                      <ArrowBackIcon sx={{ fontSize: 20 }} />
                      <h3>Quay lại</h3>
                    </div>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormPage>
  );
};

export default RegisterDoctor;
