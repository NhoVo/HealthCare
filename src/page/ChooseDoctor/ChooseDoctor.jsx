import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames/bind";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FormPage from "../../components/FormPage/FormPage";
import { fetchChooseDoctor } from "../../Redux/Features/Doctor/ChooseDoctor";
import filterSlice from "../../Redux/Features/filter/filterSlice";
import { fetchUserDoctors } from "../../Redux/Features/Users/UserDoctors";
import { userDoctors, usersRemainingSelector } from "../../Redux/selector";

import styles from "./ChooseDoctor.module.scss";

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
    dispatch(fetchUserDoctors()).then((v) => {
      console.log(v);
    });
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
  };
  const handleSearch = () => {
    dispatch(filterSlice.actions.searchFilterChange(searchPhone));

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
          <div className={cx("center-Infor")}>
            <div className={cx("col-4")}>
              <div className={cx("title-list")}>
                Danh sách sách bác sĩ ({listdoctor?.length})
              </div>
              <div className={cx("strikethrough")}></div>
              <div className={cx("search-form")}>
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
                        placeholder="Nhập số điện thoại bệnh nhân..."
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
                  <div className={cx("list-sum")}>
                    {searchResult ? (
                      <div className={cx("list-conversation")}>
                        <img
                          className={cx("avatar-img")}
                          // src={phoneNumber.avatar}
                          src={result.avatar}
                          alt="avatar"
                        />
                        <div className={cx("content")}>
                          <span className={cx("username")}>
                            {result?.fullName}
                          </span>
                          <span className={cx("message")}>{result?.phone}</span>
                          <span className={cx("message")}>
                            Ngày sinh:
                            {moment(result?.dateOfBirth).format("DD/MM/YYYY")}
                          </span>
                        </div>

                        <div className={cx("result-add-friend")}>
                          <button onClick={() => handleSeen(result)}>
                            Xem
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {listdoctor?.map((user) => {
                          return (
                            <div
                              className={cx("list-conversation")}
                              key={user?.id}
                            >
                              <img
                                className={cx("avatar-img")}
                                // src={phoneNumber.avatar}
                                src={user.avatar}
                                alt="avatar"
                              />
                              <div className={cx("content")}>
                                <span className={cx("username")}>
                                  {user.fullName}
                                </span>
                                <span className={cx("message")}>
                                  {user.phone}
                                </span>
                                <span className={cx("message")}>
                                  Ngày sinh:
                                  {moment(user?.dateOfBirth).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </div>
                              <div className={cx("result-add-friend")}>
                                {user.id === userD.id ? (
                                  <button onClick={() => handleChoose(user)}>
                                    chọn
                                  </button>
                                ) : (
                                  <button onClick={() => handleSeen(user)}>
                                    Xem
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("col-8")}>
            <div className={cx("title-search")}>Thông tin bác sĩ</div>
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
                          <b>Ngày sinh:</b>{" "}
                          <span>
                            {" "}
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
                          <b>Đánh giá:</b>
                          <span>{userD?.rating}Sao</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field-2")}>
                        <label>
                          <b>Mô tả:</b>
                          <span>{userD?.description}</span>
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
