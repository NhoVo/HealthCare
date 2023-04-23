import classNames from "classnames/bind";
import React, { useState } from "react";

import styles from "./ForgetPassword.module.scss";
import FormPage from "../../components/FormPage/FormPage";
import { ToastContainer } from "react-toastify";
import TextInput from "../../components/TextInput/TextInput";
import LockIcon from "@mui/icons-material/Lock";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const cx = classNames.bind(styles);

const ForgetPassword = () => {
  return (
    <FormPage>
      <ToastContainer />
      <div className={cx("container")}>
        <div className={cx("row")}>
          <div
            className={cx(
              "offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3"
            )}
          >
            <div className={cx("panel-border")}>
              <div className={cx("panel-heading")}>
                <h3 className={cx("pt-3 font-weight-bold")}>ĐĂNG NHẬP</h3>
              </div>
              <div className={cx("panel-body p-3")}>
                <form>
                  <div className={cx("form-group py-2")}>
                    <div className={cx("input-field")}>
                      <LockIcon color="primary" sx={{ fontSize: 40 }} />

                      <TextInput
                        id="outlined-helperText"
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại..."
                        // value={phone}
                        // onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={cx("form-group py-1 pb-2")}>
                    <div className={cx("input-field")}>
                      <LockIcon color="primary" sx={{ fontSize: 40 }} />
                      <TextInput
                        id="outlined-password-input"
                        type="password"
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu..."
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button>Đăng nhập</Button>

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

export default ForgetPassword;
