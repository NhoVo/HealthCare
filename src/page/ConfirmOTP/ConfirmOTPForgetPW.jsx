import { RecaptchaVerifier } from "@firebase/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import FormPage from "../../components/FormPage/FormPage";
import TextInput from "../../components/TextInput/TextInput";
import { authentication } from "../../util/firebase";
import styles from "./ConfirmOTP.module.scss";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
const ConfirmOTPForgetPW = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { handleSubmit } = useForm();
  const phone = location.state?.phone;

  const password = location.state?.password;
  const confirmPassword = location.state?.confirmPassword;

  const [OTP, setOTP] = useState("");
  //API Register/v1/user/update-password
  const forget = () => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/update-password`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        newPassword: password,
        confirmNewPassword: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.statusCode !== 200) {
          throw new Error(resData.message);
        } else {
          return resData.data;
        }
      });
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "tam",
      {
        size: "invisible",
        callback: (response) => {},
      },
      authentication
    );
  };
  const handleConfirmOTP = () => {
    if (OTP.length === 6) {
      generateRecaptcha();
      if (OTP.length === 6) {
        let confirmationResult = window.confirmationResult;
        confirmationResult
          .confirm(OTP)
          .then((result) => {
            // User signed in successfully.
            // ...

            forget().then((token) => {
              if (typeof token != "undefined") {
                toast.success("thành công");
                navigate("/", {
                  state: true,
                });
                setTimeout(() => {
                  navigate("/Home");
                }, 2000);
              }
            });
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error);
            alert("Mã OTP sai");
          });
      } else {
        alert("Mã OTP Phải là 6 số");
      }
    }
  };
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
                <form onSubmit={handleSubmit(handleConfirmOTP)}>
                  <div className={cx("form-group py-2")}>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Mã OTP"
                        placeholder="Nhập mã OTP"
                        value={OTP}
                        onChange={(e) => setOTP(e.target.value)}
                      />
                    </div>
                  </div>
                  <Link to="/ChooseDoctor">
                    <div className={cx("form-inline")}>
                      <u id="forgot" className={cx("font-weight-bold")}>
                        Gửi lại mã?
                      </u>
                    </div>
                  </Link>
                  <Button>
                    Xác nhận <div id="tam"></div>
                  </Button>
                  <Link to="/ForgetPassword">
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

export default ConfirmOTPForgetPW;
