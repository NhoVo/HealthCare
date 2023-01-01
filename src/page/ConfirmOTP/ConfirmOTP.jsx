import React from "react";
import classNames from "classnames/bind";
import styles from "./ConfirmOTP.module.scss";
import FormPage from "../../components/FormPage/FormPage";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const cx = classNames.bind(styles);
const ConfirmOTP = () => {
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
                <h3 className={cx("pt-3 font-weight-bold")}>Xác thực OTP</h3>
              </div>
              <div className={cx("panel-body p-3")}>
                <form>
                  <div className={cx("form-group py-2")}>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Mã OTP"
                        placeholder="Nhập mã OTP"
                      />
                    </div>
                  </div>
                  <div className={cx("form-inline")}>
                    <u id="forgot" className={cx("font-weight-bold")}>
                      Gửi lại mã?
                    </u>
                  </div>
                  <Button>Xác nhận</Button>
                  <Link to="/RegisterDoctor">
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

export default ConfirmOTP;
