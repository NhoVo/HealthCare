import { PhoneIphone } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import FormPage from "../../components/FormPage/FormPage";
import TextInput from "../../components/TextInput/TextInput";
import styles from "./Login.module.scss";
import { ToastContainer, toast } from "react-toastify";

const cx = classNames.bind(styles);

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [roleLogin, setRoleLogin] = useState("");

  const { handleSubmit } = useForm();
  const navigate = useNavigate();

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
  const handleLogin = () => {
    sign()
      .then((token) => {
        if (typeof token != "undefined") {
          if (token.role === "PATIENT") {
            toast.success("Đăng nhập thành công");
            localStorage.setItem(
              "user_login",
              JSON.stringify(token.access_token)
            );
            localStorage.setItem(
              "jwt_refresh_token",
              JSON.stringify(token.refresh_token)
            );
            setRoleLogin(token.role);

            navigate("/Home", {
              state: {
                roleLogin,
              },
            });
            setTimeout(() => {
              navigate("/Home");
            }, 4000);
          } else {
            toast.success("Đăng nhập thành công");
            localStorage.setItem(
              "user_login",
              JSON.stringify(token.access_token)
            );
            localStorage.setItem(
              "jwt_refresh_token",
              JSON.stringify(token.refresh_token)
            );
            const role = token.role;
            navigate("/Home", {
              state: {
                role,
              },
            });
            setTimeout(() => {
              navigate("/Home");
            }, 2000);
          }
        }
      })
      .catch((err) => {
        toast.error(err.toString());
        console.log(err);
      });
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
                <h3 className={cx("pt-3 font-weight-bold")}>ĐĂNG NHẬP</h3>
              </div>
              <div className={cx("panel-body p-3")}>
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className={cx("form-group py-2")}>
                    <div className={cx("input-field")}>
                      <PhoneIphone color="primary" sx={{ fontSize: 40 }} />
                      <TextInput
                        id="outlined-helperText"
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={cx("form-inline")}>
                    <input type="checkbox" name="remember" id="remember" />
                    <label className={cx("text-muted")}>Nhớ mật khẩu</label>
                    <Link to="/forgetPassword">
                      <u className={cx("font-weight-bold")}>Quên mật Khẩu ?</u>
                    </Link>
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
                      <Link to="/ResisterPatient">
                        <u>Đăng ký tài khoản bệnh nhân</u>{" "}
                      </Link>
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

export default Login;
