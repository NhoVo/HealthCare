// libs
import classNames from "classnames/bind";
import { useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUser } from "@fortawesome/free-solid-svg-icons";
// me
import styles from "./ModelInfoAccount.module.scss";
// import ModelWrapper from "~/components/ModelWrapper";
import SubModelInfoAccount from "./SubModelInfoAccount";
import images from "../../../assets/images/index";
import ModelWrapper from "../ModelWrapper";

const cx = classNames.bind(styles);

function ModelInfoAccount({
  yourProfile,
  user,
  userDoctor,
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
  console.log(userDoctor);
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

      {userDoctor.role === "DOCTOR" ? (
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
                <div className={cx("info-acc")}>
                  <div className={cx("info-image")}>
                    <img
                      className={cx("img-cover")}
                      src={images?.logo}
                      alt="img-cover"
                    />
                    <img
                      className={cx("img-avatar")}
                      src={images.logo}
                      alt="img-avatar"
                    />
                  </div>
                  <div className={cx("info-name")}>
                    <div className={cx("name")}>
                      {userDoctor.doctor?.fullName}
                    </div>
                  </div>
                </div>
              </div>
              {/* render (map) after */}
              <div className={cx("model-info-acc-body")}>
                <div className={cx("info-desc-title")}>Thông tin cá nhân</div>
                <div className={cx("info-desc-line")}>
                  <div className={cx("info-title")}>Điện thoại: </div>
                  <div>{userDoctor.doctor?.phone}</div>
                </div>
                <div className={cx("info-desc-line")}>
                  <div className={cx("info-title")}>Giới tính: </div>
                  <div>
                    {userDoctor.doctor?.gender === "MALE" ? "Nam" : "Nữ"}
                  </div>
                </div>
                <div className={cx("info-desc-line")}>
                  <div className={cx("info-title")}>Ngày sinh: </div>
                  <div>
                    {moment(userDoctor.doctor?.dateOfBirth).format(
                      "DD/MM/YYYY"
                    )}
                  </div>
                </div>
              </div>

              <div className={cx("model-info-acc-footer")}>
                {/* model update info account */}
                {friend || ConversationInfo ? null : (
                  <SubModelInfoAccount userDoctor={userDoctor} />
                )}
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
              <div className={cx("info-acc")}>
                <div className={cx("info-image")}>
                  <img
                    className={cx("img-cover")}
                    src={images?.logo}
                    alt="img-cover"
                  />
                  <img
                    className={cx("img-avatar")}
                    src={images.logo}
                    alt="img-avatar"
                  />
                </div>
                <div className={cx("info-name")}>
                  <div className={cx("name")}>{user?.fullName}</div>
                </div>
              </div>
            </div>
            {/* render (map) after */}
            <div className={cx("model-info-acc-body")}>
              <div className={cx("info-desc-title")}>Thông tin cá nhân</div>
              <div className={cx("info-desc-line")}>
                <div className={cx("info-title")}>Điện thoại: </div>
                <div>{user?.phone}</div>
              </div>
              <div className={cx("info-desc-line")}>
                <div className={cx("info-title")}>Giới tính: </div>
                <div>{user?.gender === "MALE" ? "Nam" : "Nữ"}</div>
              </div>
              <div className={cx("info-desc-line")}>
                <div className={cx("info-title")}>Ngày sinh: </div>
                <div>{moment(user?.dateOfBirth).format("DD/MM/YYYY")}</div>
              </div>
            </div>

            <div className={cx("model-info-acc-footer")}>
              {/* model update info account */}
              {friend || ConversationInfo ? null : (
                <SubModelInfoAccount user={user} />
              )}
            </div>
          </div>
        </ModelWrapper>
      )}
    </>
  );
}

export default ModelInfoAccount;
