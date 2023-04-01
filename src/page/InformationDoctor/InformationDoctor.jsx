import classNames from "classnames/bind";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import images from "../../assets/images";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import { fetchUserDoctor } from "../../Redux/Features/Users/UserDoctors";
import {
  ratingOfDoctor,
  userDoctorPatient,
  userLogin,
} from "../../Redux/selector";
import styles from "./InformationDoctor.module.scss";

import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import useDebounce from "../../components/hooks/useDebounce";
import ReactStars from "react-rating-stars-component";
import {
  getRatingOfDoctor,
  postRatingOfDoctor,
} from "../../Redux/Features/Rating/RatingDoctor";
import { postNotification } from "../../Redux/Features/Notifications/Notifications";
const cx = classNames.bind(styles);

const InformationDoctor = () => {
  const userD = useSelector(userDoctorPatient);

  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  const debouncedValue = useDebounce(user, 500);
  //bac si
  const userDoctor = useSelector(userLogin);
  //  const ratingDoctor = useSelector(ratingOfDoctor);
  // console.log(ratingDoctor);
  const [coordinates, setCoordinates] = useState(null);
  const [coordinatesP, setCoordinatesP] = useState(null);
  const [rating, setRating] = useState("");
  useEffect(() => {
    dispatch(fetchUserDoctor(user.doctorId));
  }, [user, debouncedValue]);

  useEffect(() => {
    if (userDoctor.role === "DOCTOR") {
      const getCoords = async () => {
        // const addressArr = userD?.address?.split(",");
        const results = await geocodeByAddress(userDoctor.doctor?.address);
        const latlng = await getLatLng(results[0]);
        setCoordinates(latlng);
      };
      userDoctor && getCoords();
    } else {
      const getCoords = async () => {
        // const addressArr = userD?.address?.split(",");
        const results = await geocodeByAddress(userD?.address);
        const latlng = await getLatLng(results[0]);
        setCoordinates(latlng);
      };
      userD && getCoords();
      const getCoordsP = async () => {
        // const addressArr = userD?.address?.split(",");
        const resultsP = await geocodeByAddress(user?.address);
        const latlngP = await getLatLng(resultsP[0]);
        setCoordinatesP(latlngP);
      };
      userD && getCoordsP();
    }
  }, [userD, userDoctor]);
  const ratingChanged = (rating) => {
    setRating(rating);
  };
  const handleRating = () => {
    const data = {
      doctorId: user.doctorId,
      rating: rating,
    };
    dispatch(postRatingOfDoctor(data));
    const data1 = {
      userId: user.doctorId,
      typeNotification: "SYSTEM",
      content: "Bệnh nhân" + "" + user.fullName + "" + " đã đánh giá bạn",
      title: "Đánh giá",
    };
    dispatch(postNotification(data1));
  };
  return (
    <>
      {userDoctor.role === "DOCTOR" ? (
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
                          {userDoctor.doctor?.fullName}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Ngày sinh:</b>

                          {moment(userDoctor.doctor?.dateOfBirth).format(
                            "DD/MM/YYYY"
                          )}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số điện thoại:</b>
                          {userDoctor.doctor?.phone}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Giới tính:</b>

                          {userDoctor.doctor?.gender === "MALE" ? "Nam" : "Nữ"}

                          {/* {moment(user?.dateOfBirth).format("DD/MM/YYYY")} */}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Email:</b>
                          {userDoctor.doctor?.email}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Nơi công tác:</b>
                          {userDoctor.doctor?.workPlace}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chuyên môn:</b>
                          {userDoctor.doctor?.specialize}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số năm kinh nghiệm:</b>
                          {userDoctor.doctor?.experience}
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
                          {userDoctor.doctor?.address}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field-2")}>
                        <label>
                          <b>Mô tả:</b>
                          {userDoctor.doctor?.description}
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={cx("col-4")}>
              <GoogleMap coords={coordinates} />
            </div>
          </div>
        </div>
      ) : (
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
                  <button onClick={handleRating}>Đánh giá</button>
                  <ReactStars
                    count={5}
                    // onChange={ratingChanged}
                    value={rating}
                    size={30}
                    activeColor="#ffd700"
                  />
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
              <GoogleMap addressP={coordinatesP} coords={coordinates} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InformationDoctor;
