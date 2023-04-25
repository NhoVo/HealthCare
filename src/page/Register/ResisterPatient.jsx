import React, { useState } from "react";

import classNames from "classnames/bind";
import FormPage from "../../components/FormPage/FormPage";
import { authentication } from "../../util/firebase";
import styles from "./ResisterPatient.module.scss";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";

import { RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth";
import { Radio, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const cx = classNames.bind(styles);
const ResisterPatient = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [optionSex, setOptionSex] = useState("");
  const [address, setAddress] = useState();
  const [birthday, setBirthday] = useState();
  const [insuranceNumber, setInsuranceNumber] = useState();
  const [job, setJob] = useState();
  const [states, setStates] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [medicalHistory, setMedicalHistory] = useState();
  const [carersFullName, setCarersFullName] = useState();
  const [carersPhone, setCarersPhone] = useState();
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

  const handleResisterPatient = () => {
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không trùng khớp");
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
          navigate("/ConFirmOTP", {
            state: {
              name,
              phone,
              password,
              optionSex,
              address,
              birthday,
              insuranceNumber,
              job,
              states,
              medicalHistory,
              carersFullName,
              carersPhone,
            },
          });
          setTimeout(() => {
            navigate("/ConFirmOTP");
          }, 2000);
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
          <div className={cx("panel-border")}>
            <div className={cx("panel-heading")}>
              <h3 className={cx("pt-3 font-weight-bold")}>
                Đăng Ký Tài Khoản Bệnh Nhân
              </h3>
            </div>
            <div className={cx("panel-body p-3")}>
              <form onSubmit={handleSubmit(handleResisterPatient)}>
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
                        label="Số bảo hiểm"
                        placeholder="Nhập Số bảo hiểm..."
                        value={insuranceNumber}
                        onChange={(e) => setInsuranceNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form-group py-1 pb-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Nghề nghiệp"
                        placeholder="Nhập Nghề nghiệp..."
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Triệu chứng"
                        placeholder="Nhập triệu chứng..."
                        value={states}
                        onChange={(e) => setStates(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form-group py-1 pb-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Tên người thân :"
                        placeholder="Nhập Tên người thân ...."
                        value={carersFullName}
                        onChange={(e) => setCarersFullName(e.target.value)}
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Nhập Số điện thoại người thân: "
                        placeholder="Nhập Số điện thoại người thân..."
                        value={carersPhone}
                        onChange={(e) => setCarersPhone(e.target.value)}
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
                      label="Tiểu sử bệnh"
                      placeholder="Nhập Tiểu sử bệnh..."
                      className={cx("intro")}
                      sx={{ width: 685 }}
                      value={medicalHistory}
                      onChange={(e) => setMedicalHistory(e.target.value)}
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

export default ResisterPatient;
