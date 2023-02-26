import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./InformationDoctor.module.scss";
import images from "../../assets/images";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { userDoctorPatient, userLogin } from "../../Redux/selector";
import { fetchUserDoctor } from "../../Redux/Features/Users/UserDoctors";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import Button from "../../components/Button/Button";

import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
const cx = classNames.bind(styles);

const InformationDoctor = () => {
  const userD = useSelector(userDoctorPatient);
  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  const [coordinates, setCoordinates] = useState(null);
  useEffect(() => {
    dispatch(fetchUserDoctor(user.doctorId));
  }, []);
  useEffect(() => {
    const getCoords = async () => {
      // const addressArr = userD?.address?.split(",");
      const results = await geocodeByAddress(userD?.address);
      const latlng = await getLatLng(results[0]);
      setCoordinates(latlng);
      console.log(latlng);
      console.log(results);
    };
    userD && getCoords();
  }, [userD]);

  return (
    <div className={cx("title")}>
      <h1>Bác Sĩ Điều Trị</h1>
      <div className={cx("col-8")}>
        <div className={cx("Content")}>
          <div className={cx("Content-img")}>
            <img
              className={cx("img")}
              // src={phoneNumber.avatar}
              src={images.doctor}
              alt="avatar"
            />
            <div className={cx("updateDoctor")}>
              <button>Thay đổi</button>
            </div>
          </div>
          <div className={cx("panel-body p-2")}>
            <form>
              <div className={cx("form-group py-1")}>
                <div className={cx("form-group-1")}>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Họ và tên:</b>
                      {userD?.fullName}
                    </label>
                  </div>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Ngày sinh:</b>

                      {moment(userD?.dateOfBirth).format("DD/MM/YYYY")}
                    </label>
                  </div>
                </div>
                <div className={cx("form-group-1")}>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Số điện thoại:</b>
                      {userD?.phone}
                    </label>
                  </div>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Giới tính:</b>

                      {userD?.gender === "MALE" ? "Nam" : "Nữ"}

                      {/* {moment(user?.dateOfBirth).format("DD/MM/YYYY")} */}
                    </label>
                  </div>
                </div>
                <div className={cx("form-group-1")}>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Email:</b>
                      {userD?.email}
                    </label>
                  </div>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Nơi công tác:</b>
                      {userD?.workPlace}
                    </label>
                  </div>
                </div>
                <div className={cx("form-group-1")}>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Chuyên môn:</b>
                      {userD?.specialize}
                    </label>
                  </div>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Số năm kinh nghiệm:</b>
                      {userD?.experience}
                    </label>
                  </div>
                </div>
                <div className={cx("form-group-1")}>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Trình độ: Tiến sĩ</b>
                    </label>
                  </div>
                  <div className={cx("input-field")}>
                    <label>
                      <b>Địa chỉ:</b>
                      {userD?.address}
                    </label>
                  </div>
                </div>
                <div className={cx("form-group-1")}>
                  <div className={cx("input-field-2")}>
                    <label>
                      <b>Mô tả:</b>
                      {userD?.description}
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={cx("col-4")}>
          <GoogleMap address={userD?.address} coords={coordinates} />
        </div>
      </div>
    </div>
  );
};

export default InformationDoctor;