import React, { useState } from "react";

import classNames from "classnames/bind";
import FormPage from "../../components/FormPage/FormPage";
import styles from "./RegisterDoctor.module.scss";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";

import { RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth";
import { Radio, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { authentication } from "../../util/firebase";
const cx = classNames.bind(styles);
const RegisterDoctor = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [birthday, setBirthday] = useState();
  const [optionSex, setOptionSex] = useState("");
  const [address, setAddress] = useState();
  const [experience, setExperience] = useState();
  const [workPlace, setWorkPlace] = useState();
  const [specialize, setSpecialize] = useState();
  const [description, setDescription] = useState();
  const { handleSubmit } = useForm();
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
  const handleChange = (e) => {
    const sex = e.target.value;
    if (sex === "MALE") {
      setOptionSex("MALE");
    } else {
      setOptionSex("FEMALE");
    }
  };
  const handleResisterDoctor = () => {
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
          navigate("/ConfirmOTPDoctor", {
            state: {
              name,
              phone,
              password,
              email,
              optionSex,
              address,
              birthday,
              experience,
              workPlace,
              specialize,
              description,
            },
          });
          console.log("Đã gửi mã");
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          //alert('Tài khoản đã yêu cầu quá nhiều lần!!!');
          console.log("Chưa gửi về OTP" + error);
        });
    }
  };
  return (
    <FormPage>
      <div className={cx("container")}>
        <div className={cx("row")}>
          <div className={cx("panel-border")}>
            <div className={cx("panel-heading")}>
              <h3 className={cx("pt-3 font-weight-bold")}>
                Đăng Ký Tài Khoản Bác Sĩ
              </h3>
            </div>
            <div className={cx("panel-body p-3")}>
              <form onSubmit={handleSubmit(handleResisterDoctor)}>
                <div className={cx("form-group py-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Họ và tên"
                        placeholder="Nhập họ và tên..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form-group py-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <label>Giới tính: </label>&ensp;
                      <label>Nam</label>
                      <Radio
                        checked={optionSex === "MALE"}
                        onChange={handleChange}
                        value="MALE"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "A" }}
                      />
                      <label>Nữ</label>
                      <Radio
                        checked={optionSex === "FEMALE"}
                        onChange={handleChange}
                        value="FEMALE"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "B" }}
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Địa chỉ"
                        placeholder="Nhập địa chỉ..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form-group py-1 pb-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <Stack component="form" noValidate spacing={1}>
                        <TextField
                          id="date"
                          label="Ngày sinh"
                          type="date"
                          sx={{ width: 333, marginTop: 1 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                        />
                      </Stack>
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Email"
                        placeholder="Nhập Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form-group py-1 pb-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Nơi làm việc"
                        placeholder="Nhập Nơi làm việc..."
                        value={workPlace}
                        onChange={(e) => setWorkPlace(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form-group py-1 pb-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Kinh nghiệm"
                        placeholder="Nhập Kinh nghiệm..."
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Chuyên Môn"
                        placeholder="Nhập Chuyên môn..."
                        value={specialize}
                        onChange={(e) => setSpecialize(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form-group py-1 pb-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-password-input"
                        type="password"
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className={cx("input-field")}>
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
                </div>
                <div className={cx("form-group py-1 pb-2")}>
                  <div className={cx("input-field")}>
                    <TextField
                      id="outlined-helperText"
                      label="Giới thiệu bản thân"
                      placeholder="Nhập giới thiệu bản thân..."
                      className={cx("intro")}
                      sx={{ width: 685 }}
                    />
                  </div>
                </div>

                <div className={cx("btn-register")}>
                  <Button>Đăng Ký</Button>
                  <div id="tam"></div>
                </div>
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
    </FormPage>
  );
};

export default RegisterDoctor;
