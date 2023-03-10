import React from "react";

import classNames from "classnames/bind";
import styles from "./RegisterDoctor.module.scss";
import FormPage from "../../components/FormPage/FormPage";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Stack,
  TextField,
} from "@mui/material";
const cx = classNames.bind(styles);
const RegisterDoctor = () => {
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
              <form>
                <div className={cx("form-group py-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại..."
                        className={cx("tam")}
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Họ và tên"
                        placeholder="Nhập họ và tên..."
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
                        // checked={selectedValue === "a"}
                        // onChange={handleChange}
                        value="a"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "A" }}
                      />
                      <label>Nữ</label>
                      <Radio
                        // checked={selectedValue === "b"}
                        // onChange={handleChange}
                        value="b"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "B" }}
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Địa chỉ"
                        placeholder="Nhập địa chỉ..."
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form-group py-1 pb-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <FormControl variant="standard" sx={{ width: 333 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                          Quận/Huyện
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          //  value={age}
                          // onChange={handleChange}
                          label="Chọn quận/Huyện"
                        >
                          <MenuItem value="">
                            <em>Chọn quận/Huyện</em>
                          </MenuItem>
                          <MenuItem value={10}>1</MenuItem>
                          <MenuItem value={20}>2</MenuItem>
                          <MenuItem value={30}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className={cx("input-field")}>
                      <FormControl variant="standard" sx={{ width: 333 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                          Nơi công tác
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          //  value={age}
                          // onChange={handleChange}
                          label="Chọn Bệnh Viện"
                        >
                          <MenuItem value="">
                            <em>Chọn Nơi công tác</em>
                          </MenuItem>
                          <MenuItem value={10}>1</MenuItem>
                          <MenuItem value={20}>2</MenuItem>
                          <MenuItem value={30}>3</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className={cx("form-group py-1 pb-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <Stack component="form" noValidate spacing={1}>
                        <TextField
                          id="date"
                          label="Birthday"
                          type="date"
                          defaultValue="2017-05-24"
                          sx={{ width: 333, marginTop: 1 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Stack>
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Email"
                        placeholder="Nhập Email..."
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form-group py-1 pb-2")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Kinh nghiệm làm việc"
                        placeholder="Nhập Kinh nghiệm làm việc..."
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Cấp bậc"
                        placeholder="Nhập Cấp bậc..."
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
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-password-input"
                        type="password"
                        label="Nhập lại mật khẩu"
                        placeholder="Nhập lại mật khẩu..."
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form-group py-1 pb-2")}>
                  <div className={cx("input-field")}>
                    <TextField
                      id="outlined-helperText"
                      label="Giới thiệu bản thân"
                      placeholder="Nhập họ và tên..."
                      className={cx("intro")}
                      sx={{ width: 685 }}
                    />
                  </div>
                </div>
                <Link to="/ConfirmOTP">
                  <div className={cx("btn-register")}>
                    <Button>Đăng Ký</Button>
                  </div>
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
    </FormPage>
  );
};

export default RegisterDoctor;
