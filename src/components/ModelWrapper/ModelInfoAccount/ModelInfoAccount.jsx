// libs
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import moment from "moment";
import { useState } from "react";
// me
import styles from "./ModelInfoAccount.module.scss";
// import ModelWrapper from "~/components/ModelWrapper";
import images from "../../../assets/images/index";
import ModelWrapper from "../ModelWrapper";
import SubModelInfoAccount from "./SubModelInfoAccount";

const cx = classNames.bind(styles);

function ModelInfoAccount({
  yourProfile,
  user,

  friend,
  ConversationInfo,
  seenInfoInGroup,
}) {
  const [openInfoAccount, setOpenInfoAccount] = useState(false);

  // Handle open/ close model info account
  const handleModelOpenInfoAccount = () => {
    setOpenInfoAccount(true);
  };
  const handleModelCloseInfoAccount = () => {
    setOpenInfoAccount(false);
  };

  return (
    <>
      {ConversationInfo ? (
        <img
          className={cx("img-avatar-ConversationInfo")}
          src={images?.logo}
          alt="img-avatar"
          onClick={handleModelOpenInfoAccount}
        />
      ) : (
        <>
          {yourProfile ? (
            <button
              className={cx("item-btn")}
              onClick={handleModelOpenInfoAccount}
            >
              {friend ? "Xem thông tin" : " Hồ sơ của bạn"}
            </button>
          ) : (
            <>
              {seenInfoInGroup ? (
                <FontAwesomeIcon className={cx("setting-icon")} icon={faUser} />
              ) : (
                <button
                  className={cx("setting-item-btn")}
                  onClick={handleModelOpenInfoAccount}
                >
                  Thông tin tài khoản
                </button>
              )}
            </>
          )}
        </>
      )}

      {user?.role === "DOCTOR" ? (
        <>
          <ModelWrapper
            className={cx("model-info-acc")}
            open={openInfoAccount}
            onClose={handleModelCloseInfoAccount}
          >
            <div className={cx("model-info-acc-bg")}>
              <div className={cx("model-info-acc-header")}>
                <div className={cx("info-acc-title")}>
                  <span className={cx("acc-title")}>Thông tin tài khoản</span>
                  <button className={cx("close-btn")}>
                    <FontAwesomeIcon
                      className={cx("acc-close-ic")}
                      icon={faXmark}
                      onClick={handleModelCloseInfoAccount}
                    />
                  </button>
                </div>

                <div className={cx("info-image")}>
                  <img
                    className={cx("img-avatar")}
                    src={user?.doctor.avatar}
                    alt="img-avatar"
                  />
                </div>

                <div className={cx("model-info-acc-body")}>
                  <form>
                    <div className={cx("form-group py-1")}>
                      <div className={cx("form-group-1")}>
                        <div className={cx("input-field")}>
                          <label>
                            <b>Họ và tên:</b>
                            <span>{user?.doctor.fullName}</span>
                          </label>
                        </div>
                        <div className={cx("input-field")}>
                          <label>
                            <b>Ngày sinh:</b>{" "}
                            <span>
                              {" "}
                              {moment(user?.doctor.dateOfBirth).format(
                                "DD/MM/YYYY"
                              )}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className={cx("form-group-1")}>
                        <div className={cx("input-field")}>
                          <label>
                            <b>Số điện thoại:</b>
                            <span>{user?.doctor.phone}</span>
                          </label>
                        </div>
                        <div className={cx("input-field")}>
                          <label>
                            <b>Giới tính:</b>
                            <span>
                              {user?.doctor.gender === "MALE" ? "Nam" : "Nữ"}
                            </span>

                            {/* {moment(user?.doctor.dateOfBirth).format("DD/MM/YYYY")} */}
                          </label>
                        </div>
                      </div>
                      <div className={cx("form-group-1")}>
                        <div className={cx("input-field")}>
                          <label>
                            <b>Email:</b>
                            <span> {user?.doctor.email}</span>
                          </label>
                        </div>
                        <div className={cx("input-field")}>
                          <label>
                            <b>Nơi công tác:</b>
                            <span>{user?.doctor.workPlace}</span>
                          </label>
                        </div>
                      </div>
                      <div className={cx("form-group-1")}>
                        <div className={cx("input-field")}>
                          <label>
                            <b>Chuyên môn:</b>
                            <span>{user?.doctor.specialize}</span>
                          </label>
                        </div>
                        <div className={cx("input-field")}>
                          <label>
                            <b>Số năm kinh nghiệm:</b>
                            <span>{user?.doctor.experience}</span>
                          </label>
                        </div>
                      </div>
                      <div className={cx("form-group-1")}>
                        <div className={cx("input-field")}>
                          <label>
                            <b>Địa chỉ:</b>
                            <span>{user?.doctor.address}</span>
                          </label>
                        </div>
                        <div className={cx("input-field")}>
                          <label>
                            <b>Mô tả:</b>
                            <span>{user?.doctor.description}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* render (map) after */}

              <div className={cx("model-info-acc-footer")}>
                {/* model update info account */}
                <SubModelInfoAccount user={user} />
              </div>
            </div>
          </ModelWrapper>
        </>
      ) : (
        <ModelWrapper
          className={cx("model-info-acc")}
          open={openInfoAccount}
          onClose={handleModelCloseInfoAccount}
        >
          <div className={cx("model-info-acc-bg")}>
            <div className={cx("model-info-acc-header")}>
              <div className={cx("info-acc-title")}>
                <span className={cx("acc-title")}>Thông tin tài khoản</span>
                <button className={cx("close-btn")}>
                  <FontAwesomeIcon
                    className={cx("acc-close-ic")}
                    icon={faXmark}
                    onClick={handleModelCloseInfoAccount}
                  />
                </button>
              </div>

              <div className={cx("info-image")}>
                <img
                  className={cx("img-avatar")}
                  src={images.logo}
                  alt="img-avatar"
                />
              </div>

              <div className={cx("model-info-acc-body")}>
                <form>
                  <div className={cx("form-group py-1")}>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Họ và tên:</b>
                          <span>{user?.fullName}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Ngày sinh:</b>
                          <span>
                            {moment(user?.dateOfBirth).format("DD/MM/YYYY")}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số điện thoại:</b>
                          <span>{user?.phone}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Giới tính:</b>{" "}
                          <span>{user?.gender ? "Nam" : "Nữ"}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số bảo hiểm:</b>{" "}
                          <span>{user?.insuranceNumber}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Nghề nghiệp:</b>
                          <span>{user?.job}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Địa chỉ:</b>
                          <span>{user?.address}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Họ tên người thân:</b>

                          <span>{user ? user?.carer[0]?.fullName : ""}</span>
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Số điện thoại người thân:</b>
                          <span>{user ? user?.carer[0]?.phone : ""}</span>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Ngày điều trị:</b>
                          <span>
                            {moment(user?.createdAt).format("DD/MM/YYYY")}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* render (map) after */}
            <div className={cx("model-info-acc-footer")}>
              {/* model update info account */}

              <SubModelInfoAccount user={user} />
            </div>
          </div>
        </ModelWrapper>
      )}
    </>
  );
}

export default ModelInfoAccount;
