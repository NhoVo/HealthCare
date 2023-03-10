// libs
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPenToSquare,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// me
import styles from "./ModelInfoAccount.module.scss";
import images from "../../../assets/images/index";
import ModelWrapper from "../ModelWrapper";
import moment from "moment";
import { Radio } from "@mui/material";

const cx = classNames.bind(styles);

function SubModelInfoAccount({ user, userDoctor }) {
  const [openUpdateInfoAccount, setOpenUpdateInfoAccount] = useState(false);
  const [optionSex, setOptionSex] = useState(
    user?.gender || userDoctor?.doctor.gender
  );
  const [birthday, setBirthday] = useState(
    moment(userDoctor?.doctor.dateOfBirth).format("YYYY-MM-DD") ||
      moment(user?.dateOfBirth).format("YYYY-MM-DD")
  );
  const [fullName, setFullName] = useState(
    user?.fullName || userDoctor?.doctor.fullName
  );

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
    setFullName(e.target.value);
  };
  const handleChange1 = (e) => {
    setBirthday(e.target.value);
  };
  const handleChange = (e) => {
    const sex = e.target.value;
    if (sex === "MALE") {
      setOptionSex(0);
    } else {
      setOptionSex(1);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ok");
  };

  //doi avatar
  const handleChangeAvatar = (e) => {
    console.log("ok");
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
        C???p nh???t th??ng tin
      </button>
      {/* Show model update info account */}
      <ModelWrapper
        className={cx("model-update-info-acc")}
        open={openUpdateInfoAccount}
        onClose={handleModelCloseUpdateInfoAccount}
      >
        <div className={cx("model-info-acc-bg")}>
          <div className={cx("model-info-acc-header")}>
            <div className={cx("info-acc-title")}>
              <span className={cx("acc-title")}>C???p nh???t th??ng tin</span>
              <button className={cx("close-btn")}>
                <FontAwesomeIcon
                  className={cx("acc-close-ic")}
                  icon={faXmark}
                  onClick={handleModelCloseUpdateInfoAccount}
                />
              </button>
            </div>
            <div className={cx("info-acc")}>
              <div className={cx("sub-info-image")}>
                {/* Preview bg single */}
                <img className={cx("img-cover")} src={images.logo} alt="" />

                {/* Preview avatar single */}
                <img
                  className={cx("sub-img-avatar")}
                  src={images.logo}
                  alt=""
                />

                {/* Option change avatar update */}
                <label htmlFor="file-info" className={cx("option-avatar")}>
                  <FontAwesomeIcon
                    className={cx("icon-camera")}
                    icon={faCamera}
                  />
                  <input
                    className={cx("hide")}
                    type="file"
                    id="file-info"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleChangeAvatar}
                  />
                </label>
              </div>
            </div>
          </div>
          {/* render (map) after */}
          <div className={cx("model-sub-info-acc-body")}>
            <div className={cx("model-sub-info-acc")}>
              <span className={cx("sub-title-desc")}>T??n hi???n th???:</span>
              <input
                className={cx("sub-input-info-acc")}
                type="text"
                value={fullName}
                onChange={handleChangeFullName}
              />
              <span className={cx("sub-desc")}>
                S??? d???ng t??n th???t ????? b???n b?? d??? d??ng nh???n di???n h??n.
              </span>
            </div>

            <div className={cx("separator")}></div>

            <div className={cx("model-sub-info-acc")}>
              <p className={cx("sub-title-info")}>Th??ng tin c?? nh??n</p>
              {/* Gender */}
              <div className={cx("sub-title-gender")}>
                <span className={cx("sub-title-desc")}>Gi???i t??nh: </span>
                <div className={cx("gender-radio")}>
                  <div className={cx("radio-option")}>
                    <Radio
                      checked={optionSex === 1}
                      onChange={handleChange}
                      value="MALE"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "0" }}
                    />
                    <div className={cx("gender")}>Nam</div>
                  </div>
                  <div className={cx("radio-option")}>
                    <Radio
                      checked={optionSex === 0}
                      onChange={handleChange}
                      value="FEMALE"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "1" }}
                    />
                    <div className={cx("gender")}>N???</div>
                  </div>
                </div>
              </div>
              {/* Date of birthday */}

              <div className={cx("sub-title-birthday")}>
                <span className={cx("sub-title-desc")}>Ng??y sinh: </span>
                <input
                  className={cx("sub-input-info-acc")}
                  type="date"
                  name="requested_order_ship_date"
                  value={birthday}
                  onChange={handleChange1}
                />
              </div>
            </div>
          </div>
          <div className={cx("model-update-info-acc-footer")}>
            <button className={cx("footer-sub-close-btn")}>H???y</button>
            <button
              className={cx("footer-sub-update-btn")}
              onClick={handleSubmit}
            >
              C???p nh???t
            </button>
          </div>
        </div>
      </ModelWrapper>

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
