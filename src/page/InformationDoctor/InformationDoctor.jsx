import classNames from "classnames/bind";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GoogleMap from "../../components/GoogleMap/GoogleMap";
import { fetchUserDoctor } from "../../Redux/Features/Users/UserDoctors";
import {
  ratingOfDoctor,
  userDoctorPatient,
  userLogin,
} from "../../Redux/selector";
import styles from "./InformationDoctor.module.scss";

import useDebounce from "../../components/hooks/useDebounce";
import ReactStars from "react-rating-stars-component";

import {
  getRatingOfDoctor,
  postRatingOfDoctor,
} from "../../Redux/Features/Rating/RatingDoctor";
import { postNotification } from "../../Redux/Features/Notifications/Notifications";

import { changeDoctor } from "../../Redux/Features/Users/userPatient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const InformationDoctor = () => {
  const userD = useSelector(userDoctorPatient);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  const debouncedValue = useDebounce(user, 500);
  //bac si
  const userDoctor = useSelector(userLogin);
  const ratingDoctor = useSelector(ratingOfDoctor);

  const [coordinatesP, setCoordinatesP] = useState([]);
  const [rating, setRating] = useState(ratingDoctor?.rate);
  useEffect(() => {
    dispatch(fetchUserDoctor(user.doctorId));
    dispatch(getRatingOfDoctor(user.doctorId));
  }, [user, debouncedValue]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinatesP({
          lat: latitude,
          lng: longitude,
        });
      }
    );
  }, []);
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
    alert("Đánh giá thành công");
  };
  const handleChange = () => {
    const choice = window.confirm(
      "Bạn có chắc chắn muốn thay đổi bác sĩ không?"
    );
    if (choice === true) {
      dispatch(changeDoctor());
      navigate("/ChooseDoctor", {
        state: true,
      });
      setTimeout(() => {
        navigate("/ChooseDoctor");
      }, 2000);
      toast.success("Bạn đã hủy thành công");
    } else {
      toast.error("Bạn đã đã hủy yêu cầu thay đổi bác sĩ");
      return;
    }
  };
  return (
    <>
      {userDoctor.role === "DOCTOR" ? (
        <>
          <div className={cx("col-12")}>
            <GoogleMap coords={coordinatesP} user={user} />
          </div>
        </>
      ) : (
        <div className={cx("title")}>
          <div className={cx("title-table")}>Thông tin bác sĩ</div>
          <div className={cx("col-8")}>
            <div className={cx("Content")}>
              <div className={cx("Content-img")}>
                <img
                  className={cx("img")}
                  // src={phoneNumber.avatar}
                  src={userD.avatar}
                  alt="avatar"
                />
              </div>
              <div className={cx("panel-body p-2")}>
                <form>
                  <div className={cx("form-group py-1")}>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Họ và tên:</b>
                          <span>{userD?.fullName}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Ngày sinh:</b>
                          <span>
                            {moment(userD?.dateOfBirth).format("DD/MM/YYYY")}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số điện thoại:</b>
                          <span>{userD?.phone}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Giới tính:</b>
                          <span>{userD?.gender === "MALE" ? "Nam" : "Nữ"}</span>

                          {/* {moment(user?.dateOfBirth).format("DD/MM/YYYY")} */}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Email:</b>
                          <span> {userD?.email}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Nơi công tác:</b>
                          <span>{userD?.workPlace}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chuyên môn:</b>
                          <span>{userD?.specialize}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số năm kinh nghiệm:</b>
                          <span>{userD?.experience}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Địa chỉ:</b>
                          <span>{userD?.address}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Mô tả:</b>
                          <span>{userD?.description}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <div className={cx("updateDoctor")}>
                          <button onClick={handleRating}>Đánh giá</button>
                          <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            value={rating}
                            size={25}
                            activeColor="#ffd700"
                            className={cx("stars")}
                          />
                        </div>
                      </div>
                      <div className={cx("input-field")}>
                        <div className={cx("updateDoctor")}>
                          <button onClick={handleChange}>Thay đổi</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={cx("col-4")}>
              <GoogleMap coords={coordinatesP} user={user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InformationDoctor;
