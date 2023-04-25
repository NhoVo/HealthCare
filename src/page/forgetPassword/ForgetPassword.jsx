import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";

import styles from "./ForgetPassword.module.scss";
import FormPage from "../../components/FormPage/FormPage";
import { ToastContainer, toast } from "react-toastify";
import TextInput from "../../components/TextInput/TextInput";
import LockIcon from "@mui/icons-material/Lock";
import Button from "../../components/Button/Button";

import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import { RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth";
import { authentication } from "../../util/firebase";
import { PhoneIphone } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import filterSlice from "../../Redux/Features/filter/filterSlice";
import { searchPhone } from "../../Redux/selector";
import { fetchUserDoctors } from "../../Redux/Features/Users/UserDoctors";
import { fetchUserPatients } from "../../Redux/Features/Users/userPatient";

const cx = classNames.bind(styles);

const ForgetPassword = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const result = useSelector(searchPhone);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  useEffect(() => {
    dispatch(fetchUserDoctors());
    dispatch(fetchUserPatients());
  }, []);
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
  const handleChecksdt = () => {
    dispatch(filterSlice.actions.searchFilterChange(phone));
    if (result === true) {
      setShow(true);
    }
  };
  const handleForgetPassWord = () => {
    if (password !== confirmPassword) {
      alert("Mật khẩu không trùng khớp");
    } else {
      generateRecaptcha();
      const phoneNumbers = "+84" + phone.slice(1);
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumbers, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
          navigate("/ConfirmOTPForgetPW", {
            state: {
              phone,
              password,
              confirmPassword,
            },
          });
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          //alert('Tài khoản đã yêu cầu quá nhiều lần!!!');
          toast.error(error.toString());
        });
    }
  };
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
                <h3 className={cx("pt-3 font-weight-bold")}>Quên mật khẩu</h3>
              </div>
              <div className={cx("panel-body p-3")}>
                <form onSubmit={handleSubmit(handleForgetPassWord)}>
                  <div className={cx("form-group py-2")}>
                    <div className={cx("input-field")}>
                      <PhoneIphone color="primary" sx={{ fontSize: 40 }} />
                      <TextInput
                        id="outlined-helperText"
                        label="Số điện thoại"
                        type="text"
                        placeholder="Nhập số điện thoại..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  {!show ? null : (
                    <>
                      <div className={cx("form-group py-2")}>
                        <div className={cx("input-field")}>
                          <LockIcon color="primary" sx={{ fontSize: 40 }} />
                          <TextInput
                            id="outlined-password-input"
                            type="password"
                            label="Mật khẩu"
                            placeholder="Nhập mật khẩu..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={cx("form-group py-1 pb-2")}>
                        <div className={cx("input-field")}>
                          <LockIcon color="primary" sx={{ fontSize: 40 }} />
                          <TextInput
                            id="outlined-password-input"
                            type="password"
                            label="Nhập lại mật khẩu"
                            placeholder="Nhập lại mật khẩu..."
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {!show ? (
                    <button
                      className={cx("btn-login")}
                      onClick={handleChecksdt}
                    >
                      kiểm tra
                    </button>
                  ) : (
                    <Button>
                      Xác nhận <div id="tam"></div>
                    </Button>
                  )}

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
