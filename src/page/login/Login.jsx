import React from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { TextField } from "@material-ui/core";
import { PhoneIphone } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import FormPage from "../../components/FormPage/FormPage";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
const cx = classNames.bind(styles);

const login = () => {
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
                <h3 className={cx("pt-3 font-weight-bold")}>Đăng nhập</h3>
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
                  <div className={cx("form-inline")}>
                    <input type="checkbox" name="remember" id="remember" />
                    <label for="remember" className={cx("text-muted")}>
                      Nhớ mật khẩu
                    </label>
                    <u id="forgot" className={cx("font-weight-bold")}>
                      Quên mật Khẩu ?
                    </u>
                  </div>
                  <Button>Đăng nhập</Button>
                  <div className={cx("title-register")}>
                    <div className={cx("title-register")}>
                      Đăng ký tài khoản dành cho bác sĩ?{" "}
                      <Link to="/RegisterDoctor">
                        <u>Đăng ký tài khoản bác sĩ</u>
                      </Link>
                    </div>
                    <div className={cx("title-register")}>
                      Đăng ký tài khoản dành cho bệnh nhân?
                      <u>Đăng ký tài khoản bệnh nhân</u>
                    </div>
                  </div>
                  <Link to="/">
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

export default login;
