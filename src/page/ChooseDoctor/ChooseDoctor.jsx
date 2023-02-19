import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ChooseDoctor.module.scss";
import FormPage from "../../components/FormPage/FormPage";
import SearchIcon from "@mui/icons-material/Search";
import images from "../../assets/images";
import filterSlice from "../../Redux/Features/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { userDoctors, usersRemainingSelector } from "../../Redux/selector";
import { fetchUserDoctors } from "../../Redux/Features/Users/UserDoctors";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchChooseDoctor } from "../../Redux/Features/Doctor/ChooseDoctor";

const cx = classNames.bind(styles);
const ChooseDoctor = () => {
  const navigate = useNavigate();

  const [searchPhone, setSearchPhone] = useState("");
  const dispatch = useDispatch();
  const result = useSelector(usersRemainingSelector);
  const listdoctor = useSelector(userDoctors);
  console.log(listdoctor);
  const [userD, setUserD] = useState([]);

  const [searchResult, setSearchResult] = useState(false);
  useEffect(() => {
    dispatch(fetchUserDoctors());
  }, []);
  useEffect(() => {
    dispatch(filterSlice.actions.searchFilterChange(searchPhone));
  }, []);
  const handleChoose = (user) => {
    const data = { doctorId: user.id };
    const choose = dispatch(fetchChooseDoctor(data));
    if (choose) {
      alert("chọn bác sĩ thành công");
      navigate("/Home");
    }
    console.log(user.id);
  };
  const handleSearch = () => {
    dispatch(filterSlice.actions.searchFilterChange(searchPhone));
    console.log("ok", result);
    if (result !== 1) {
      setSearchResult(true);
      setUserD(result[0]);
    } else {
      toast.error(
        "Số điện thoại này không tồn tại hoặc chưa được đăng ký tài khoản. Vui lòng thử lại!"
      );
    }
  };
  const handleSeen = (user) => {
    setUserD(user);
  };
  return (
    <FormPage>
      <div className={cx("container")}>
        <div className={cx("title")}> BÁC SĨ ĐIỀU TRỊ</div>
        <div className={cx("col-12")}>
          <div className={cx("col-4")}>
            <div className={cx("title-search")}>Tìm kiếm bác sĩ</div>
            <div
              className={cx(
                "row height d-flex justify-content-center align-items-center"
              )}
            >
              <div className={cx("col-md-8")}>
                <div className={cx("search")}>
                  <SearchIcon className={cx("item")} />
                  <input
                    type="text"
                    className={cx("form-control")}
                    placeholder="Nhập số điện thoại bác sĩ..."
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                  />
                  <button
                    className={cx("btn btn-primary")}
                    onClick={handleSearch}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>

            {searchResult ? (
              <div className={cx("list-conversation")}>
                <img
                  className={cx("avatar-img")}
                  // src={phoneNumber.avatar}
                  src={images.logo}
                  alt="avatar"
                />
                <div className={cx("content")}>
                  <h4 className={cx("username")}>{userD.fullName}</h4>
                  <p className={cx("message")}>{userD.phoneNumber}</p>
                </div>
                <div className={cx("result-add-friend")}>
                  <button onClick={handleChoose}>Chọn</button>
                </div>
              </div>
            ) : (
              <>
                {listdoctor?.map((user) => {
                  return (
                    <div
                      className={cx("list-conversation")}
                      onClick={() => handleSeen(user)}
                      key={user?._id}
                    >
                      <img
                        className={cx("avatar-img")}
                        // src={phoneNumber.avatar}
                        src={images.logo}
                        alt="avatar"
                      />
                      <div className={cx("content")}>
                        <h4 className={cx("username")}>{user.fullName}</h4>
                        <p className={cx("message")}>{user.phone}</p>
                        <p className={cx("message")}>
                          Số bệnh nhân: {user.patient.length}
                        </p>
                      </div>
                      <div className={cx("result-add-friend")}>
                        <button onClick={() => handleChoose(user)}>Chọn</button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className={cx("col-8")}>
            <div className={cx("title-search")}>Thông tin bác sĩ</div>
            <div className={cx("Content")}>
              <div className={cx("Content-img")}>
                <img
                  className={cx("img")}
                  // src={phoneNumber.avatar}
                  src={images.doctor}
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
                          {userD.fullName}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Ngày sinh:</b>

                          {moment(userD.dateOfBirth).format("DD/MM/YYYY")}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số điện thoại:</b>
                          {userD.phone}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Giới tính:</b>

                          {userD.gender === "MALE" ? "Nam" : "Nữ"}

                          {/* {moment(user?.dateOfBirth).format("DD/MM/YYYY")} */}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Email:</b>
                          {userD.email}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Nơi công tác:</b>
                          {userD.workPlace}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chuyên môn:</b>
                          {userD.specialize}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số năm kinh nghiệm:</b>
                          {userD.experience}
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
                          {userD.address}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field-2")}>
                        <label>
                          <b>Mô tả:</b>
                          {userD.description}
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormPage>
  );
};

export default ChooseDoctor;
