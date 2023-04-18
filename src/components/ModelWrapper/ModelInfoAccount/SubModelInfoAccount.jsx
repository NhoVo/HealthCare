// libs
import {
  faCamera,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// me
import { Radio, TextField } from "@mui/material";
import moment from "moment";
import images from "../../../assets/images/index";
import ModelWrapper from "../ModelWrapper";
import styles from "./ModelInfoAccount.module.scss";
import TextInput from "../../TextInput/TextInput";
import { Stack } from "react-bootstrap";

const cx = classNames.bind(styles);

function SubModelInfoAccount({ user }) {
  const [openUpdateInfoAccount, setOpenUpdateInfoAccount] = useState(false);
  const [avatar, setAvatar] = useState("");
  // const [optionSex, setOptionSex] = useState(
  //   user?.gender || userDoctor?.doctor.gender
  // );
  // const [birthday, setBirthday] = useState(
  //   moment(userDoctor?.doctor.dateOfBirth).format("YYYY-MM-DD") ||
  //     moment(user?.dateOfBirth).format("YYYY-MM-DD")
  // );
  // const [fullName, setFullName] = useState(
  //   user?.fullName || userDoctor?.doctor.fullName
  // );

  // const [avatar, setAvatar] = useState(user?.avatarLink); //
  //const dispatch = useDispatch();

  // Handle open/ close model update info account
  const handleModelOpenUpdateInfoAccount = () => {
    setOpenUpdateInfoAccount(true);
  };
  const handleModelCloseUpdateInfoAccount = () => {
    setOpenUpdateInfoAccount(false);
  };

  // Handle change input full name
  const handleChangeFullName = (e) => {
    // setFullName(e.target.value);
  };
  const handleChange1 = (e) => {
    // setBirthday(e.target.value);
  };
  const handleChange = (e) => {
    const sex = e.target.value;
    // if (sex === "MALE") {
    //   setOptionSex(0);
    // } else {
    //   setOptionSex(1);
    // }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ok");
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    file.previews = URL.createObjectURL(file);
    setAvatar(file);
    console.log(file);
  };
  return (
    <>
      <button
        className={cx("footer-update-btn")}
        onClick={handleModelOpenUpdateInfoAccount}
      >
        <FontAwesomeIcon
          className={cx("footer-update-ic")}
          icon={faPenToSquare}
        />
        Cập nhật thông tin
      </button>
      {/* Show model update info account */}
      {user?.role === "DOCTOR" ? (
        <ModelWrapper
          className={cx("model-info-acc")}
          open={openUpdateInfoAccount}
          onClose={handleModelCloseUpdateInfoAccount}
        >
          <div className={cx("model-info-acc-bg")}>
            <div className={cx("model-info-acc-header")}>
              <div className={cx("info-acc-title")}>
                <span className={cx("acc-title")}>Thông tin tài khoản</span>
                <button className={cx("close-btn")}>
                  <FontAwesomeIcon
                    className={cx("acc-close-ic")}
                    icon={faXmark}
                    onClick={handleModelCloseUpdateInfoAccount}
                  />
                </button>
              </div>
              <label className={cx("info-image")} htmlFor="file-info">
                <img
                  className={cx("img-avatar")}
                  src={images.logo}
                  alt="img-avatar"
                />
                <input
                  className={cx("hide")}
                  type="file"
                  id="file-info"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleChangeAvatar}
                />
              </label>
              <div className={cx("panel-body p-3")}>
                <form>
                  <div className={cx("form-group py-2")}>
                    <div className={cx("form-group-2")}>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Số điện thoại"
                          placeholder="Nhập số điện thoại..."
                          // value={phone}
                          // onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Họ và tên"
                          placeholder="Nhập họ và tên..."
                          // value={name}
                          // onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form-group py-2")}>
                    <div className={cx("form-group-2")}>
                      <div className={cx("input-field-2")}>
                        <label>Giới tính: </label>&ensp;
                        <label>Nam</label>
                        <Radio
                          // checked={optionSex === "MALE"}
                          onChange={handleChange}
                          value="MALE"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                        <label>Nữ</label>
                        <Radio
                          // checked={optionSex === "FEMALE"}
                          onChange={handleChange}
                          value="FEMALE"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "B" }}
                        />
                      </div>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Địa chỉ"
                          placeholder="Nhập địa chỉ..."
                          // value={address}
                          // onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form-group py-1 pb-2")}>
                    <div className={cx("form-group-2")}>
                      <div className={cx("input-field-2")}>
                        <Stack
                          component="form"
                          noValidate
                          spacing={1}
                          className={cx("input-field-date")}
                        >
                          <TextField
                            id="date"
                            label="Ngày sinh"
                            type="date"
                            sx={{ width: 200 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            // value={birthday}
                            // onChange={(e) => setBirthday(e.target.value)}
                          />
                        </Stack>
                      </div>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Email"
                          placeholder="Nhập Email..."
                          // value={email}
                          // onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form-group py-1 pb-2")}>
                    <div className={cx("form-group-2")}>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Nơi làm việc"
                          placeholder="Nhập Nơi làm việc..."
                          // value={workPlace}
                          // onChange={(e) => setWorkPlace(e.target.value)}
                        />
                      </div>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Chức vụ"
                          placeholder="Chứ vụ..."
                          // value={workPlace}
                          // onChange={(e) => setWorkPlace(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form-group py-1 pb-2")}>
                    <div className={cx("form-group-2")}>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Kinh nghiệm"
                          placeholder="Nhập Kinh nghiệm..."
                          // value={experience}
                          // onChange={(e) => setExperience(e.target.value)}
                        />
                      </div>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Chuyên Môn"
                          placeholder="Nhập Chuyên môn..."
                          // value={specialize}
                          // onChange={(e) => setSpecialize(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form-group py-1 pb-2")}>
                    <div className={cx("input-field-2")}>
                      <Stack
                        component="form"
                        noValidate
                        spacing={1}
                        className={cx("input-field-date")}
                      >
                        <TextField
                          id="outlined-helperText"
                          label="Giới thiệu bản thân"
                          placeholder="Nhập giới thiệu bản thân..."
                          className={cx("intro")}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={{ width: 450 }}
                        />
                      </Stack>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* render (map) after */}

            <div className={cx("model-update-info-acc-footer")}>
              <button className={cx("footer-sub-close-btn")}>Hủy</button>
              <button
                className={cx("footer-sub-update-btn")}
                onClick={handleSubmit}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </ModelWrapper>
      ) : (
        <ModelWrapper
          className={cx("model-info-acc")}
          open={openUpdateInfoAccount}
          onClose={handleModelCloseUpdateInfoAccount}
        >
          <div className={cx("model-info-acc-bg")}>
            <div className={cx("model-info-acc-header")}>
              <div className={cx("info-acc-title")}>
                <span className={cx("acc-title")}>Thông tin tài khoản</span>
                <button className={cx("close-btn")}>
                  <FontAwesomeIcon
                    className={cx("acc-close-ic")}
                    icon={faXmark}
                    onClick={handleModelCloseUpdateInfoAccount}
                  />
                </button>
              </div>
              {/* <div className={cx("info-image")}>
                <img
                  className={cx("img-avatar")}
                  src={images.logo}
                  alt="img-avatar"
                />
              </div> */}
              <label className={cx("info-image")} htmlFor="file-info">
                <img
                  className={cx("img-avatar")}
                  src={images.logo}
                  alt="img-avatar"
                />
                <input
                  className={cx("hide")}
                  type="file"
                  id="file-info"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleChangeAvatar}
                />
              </label>
              <div className={cx("panel-body p-3")}>
                <form>
                  <div className={cx("form-group py-2")}>
                    <div className={cx("form-group-2")}>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Số điện thoại"
                          placeholder="Nhập số điện thoại..."
                          // value={phone}
                          // onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Họ và tên"
                          placeholder="Nhập họ và tên..."
                          // value={name}
                          // onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form-group py-2")}>
                    <div className={cx("form-group-2")}>
                      <div className={cx("input-field-2")}>
                        <label>Giới tính: </label>&ensp;
                        <label>Nam</label>
                        <Radio
                          // checked={optionSex === "MALE"}
                          onChange={handleChange}
                          value="MALE"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "A" }}
                        />
                        <label>Nữ</label>
                        <Radio
                          // checked={optionSex === "FEMALE"}
                          onChange={handleChange}
                          value="FEMALE"
                          name="radio-buttons"
                          inputProps={{ "aria-label": "B" }}
                        />
                      </div>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Địa chỉ"
                          placeholder="Nhập địa chỉ..."
                          // value={address}
                          // onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form-group py-1 pb-2")}>
                    <div className={cx("form-group-2")}>
                      <div className={cx("input-field-2")}>
                        <Stack
                          component="form"
                          noValidate
                          spacing={1}
                          className={cx("input-field-date")}
                        >
                          <TextField
                            id="date"
                            label="Ngày sinh"
                            type="date"
                            sx={{ width: 200 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            // value={birthday}
                            // onChange={(e) => setBirthday(e.target.value)}
                          />
                        </Stack>
                      </div>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Email"
                          placeholder="Nhập Email..."
                          // value={email}
                          // onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form-group py-1 pb-2")}>
                    <div className={cx("form-group-2")}>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Nơi làm việc"
                          placeholder="Nhập Nơi làm việc..."
                          // value={workPlace}
                          // onChange={(e) => setWorkPlace(e.target.value)}
                        />
                      </div>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Chức vụ"
                          placeholder="Chứ vụ..."
                          // value={workPlace}
                          // onChange={(e) => setWorkPlace(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form-group py-1 pb-2")}>
                    <div className={cx("form-group-2")}>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Kinh nghiệm"
                          placeholder="Nhập Kinh nghiệm..."
                          // value={experience}
                          // onChange={(e) => setExperience(e.target.value)}
                        />
                      </div>
                      <div className={cx("input-field-2")}>
                        <TextInput
                          id="outlined-helperText"
                          label="Chuyên Môn"
                          placeholder="Nhập Chuyên môn..."
                          // value={specialize}
                          // onChange={(e) => setSpecialize(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form-group py-1 pb-2")}>
                    <div className={cx("input-field-2")}>
                      <Stack
                        component="form"
                        noValidate
                        spacing={1}
                        className={cx("input-field-date")}
                      >
                        <TextField
                          id="outlined-helperText"
                          label="Giới thiệu bản thân"
                          placeholder="Nhập giới thiệu bản thân..."
                          className={cx("intro")}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={{ width: 450 }}
                        />
                      </Stack>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* render (map) after */}

            <div className={cx("model-update-info-acc-footer")}>
              <button className={cx("footer-sub-close-btn")}>Hủy</button>
              <button
                className={cx("footer-sub-update-btn")}
                onClick={handleSubmit}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </ModelWrapper>
      )}

      {/* Show toast status */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick={false}
      />
    </>
  );
}

export default SubModelInfoAccount;
