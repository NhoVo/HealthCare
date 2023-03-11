import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ConfirmOTP.module.scss";
import FormPage from "../../components/FormPage/FormPage";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RecaptchaVerifier } from "@firebase/auth";
import { authentication } from "../../util/firebase";
import { useForm } from "react-hook-form";
const cx = classNames.bind(styles);
const ConfirmOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { handleSubmit } = useForm();
  const phone = location.state?.phone;
  const name = location.state?.name;
  const password = location.state?.password;
  const optionSex = location.state?.optionSex;

  const address = location.state?.address;
  const birthday = location.state?.birthday;
  const insuranceNumber = location.state?.insuranceNumber;
  const job = location.state?.job;
  const states = location.state?.states;
  const medicalHistory = location.state?.medicalHistory;
  const [OTP, setOTP] = useState("");
  //API Register
  const register = () => {
    return fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/user/register/patient`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          phone: phone,
          password: password,
          gender: optionSex,
          address: address,
          dateOfBirth: birthday,
          insuranceNumber: insuranceNumber,
          job: job,
          state: states,
          medicalHistory: medicalHistory,
        }),
      }
    )
      .then((res) => res.json())
      .then((resData) => {
        if (resData.statusCode !== 200) {
          throw new Error(resData.message);
        } else {
          return resData.data;
        }
      });
  };
  const sign = () => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/auth/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        password: password,
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
      console.log("trong if");
      generateRecaptcha();
      if (OTP.length === 6) {
        let confirmationResult = window.confirmationResult;
        confirmationResult
          .confirm(OTP)
          .then((result) => {
            // User signed in successfully.
            // ...

            register().then((token) => {
              if (typeof token != "undefined") {
                alert("Đăng ký thành công");
                sign()
                  .then((token) => {
                    if (typeof token != "undefined") {
                      localStorage.setItem(
                        "user_login",
                        JSON.stringify(token.access_token)
                      );
                      console.log("đã đăng nhập");
                      navigate("/ChooseDoctor", {
                        state: true,
                      });
                      setTimeout(() => {
                        navigate("/ChooseDoctor");
                      }, 2000);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
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
