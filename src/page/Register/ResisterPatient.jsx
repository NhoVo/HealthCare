import React from "react";

import classNames from "classnames/bind";
import styles from "./ResisterPatient.module.scss";
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
const ResisterPatient = () => {
  return (
    <FormPage>
      <div className={cx("container")}>
        <div className={cx("row")}>
          <div className={cx("panel-border")}>
            <div className={cx("panel-heading")}>
              <h3 className={cx("pt-3 font-weight-bold")}>
                Đăng Ký Tài Khoản Bệnh Nhân
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
                      <TextInput
                        id="outlined-helperText"
                        label="Quận/Huyện"
                        placeholder="Nhập Quận/Huyện..."
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <FormControl variant="standard" sx={{ width: 333 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                          Tỉnh/Thành Phố
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          //  value={age}
                          // onChange={handleChange}
                          label="Chọn Tỉnh/Thành Phố"
                        >
                          <MenuItem value="">
                            <em>Chọn Tỉnh/Thành Phố</em>
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
                        label="Số bảo hiểm"
                        placeholder="Nhập Số bảo hiểm..."
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
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <TextInput
                        id="outlined-helperText"
                        label="Tình trạng"
                        placeholder="Nhập Tình trạng..."
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
                      label="Tiểu sử bệnh"
                      placeholder="Nhập Tiểu sử bệnh..."
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

export default ResisterPatient;
