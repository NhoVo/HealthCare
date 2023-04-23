import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import WarningIcon from "@mui/icons-material/Warning";
import { Avatar } from "@mui/material";
import Tippy from "@tippyjs/react";
import TippyHeadless from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "tippy.js/dist/tippy.css";
import Information from "../../../page/Information/Information";
import {
  allNotifiDoctor,
  indexReadNotifications,
  userLogin,
} from "../../../Redux/selector";
import ItemLeft from "../../ItemLeft/ItemLeft";
import ModelInfoAccount from "../../ModelWrapper/ModelInfoAccount/ModelInfoAccount";
import Popper from "../../Popper/Popper";
import Search from "../../Search/Search";
import styles from "./Middle.module.scss";
import GppGoodIcon from "@mui/icons-material/GppGood";
import moment from "moment";
import {
  fetchNotficationsOfDoctor,
  seenAllNotifications,
  seenNotifications,
} from "../../../Redux/Features/Notifications/Notifications";
import ModelWrapper from "../../ModelWrapper/ModelWrapper";
import { useForm } from "react-hook-form";
import { pathchangePassWord } from "../../../Redux/Features/Users/userPatient";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const Middle = () => {
  const user = useSelector(userLogin);
  const userDoctor = useSelector(userLogin);
  const allNotificationsDoctor = useSelector(allNotifiDoctor);
  const [idRead, setIdRead] = useState(false);
  const dispatch = useDispatch();
  const index = useSelector(indexReadNotifications);
  const [openInfoAccount, setOpenInfoAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleSubmit } = useForm();
  useEffect(() => {
    dispatch(fetchNotficationsOfDoctor());
    setIdRead(false);
  }, [idRead === true]);
  const nameDoctor =
    userDoctor.doctor?.fullName?.split(" ")[
      userDoctor.doctor?.fullName?.split(" ")?.length - 2
    ] +
    " " +
    userDoctor.doctor?.fullName?.split(" ")[
      userDoctor.doctor?.fullName?.split(" ")?.length - 1
    ];
  const name =
    user.fullName?.split(" ")[user.fullName?.split(" ")?.length - 2] +
    " " +
    user.fullName?.split(" ")[user.fullName.split(" ")?.length - 1];
  const handleReal = (n) => {
    setIdRead(true);
    dispatch(seenNotifications(n.id));
  };
  const handleSeenAll = () => {
    setIdRead(true);
    dispatch(seenAllNotifications());
  };
  const handleUpdatePassWord = () => {
    setOpenInfoAccount(true);
  };
  const handleModelCloseInfoAccount = () => {
    setOpenInfoAccount(false);
    setPassword("");
    setConfirmPassword("");
    setNewPassword("");
  };
  const handleModelUpdatePass = async () => {
    console.log(password);
    console.log(newPassword);
    console.log(confirmPassword);
    const data = {
      oldPassword: password,
      newPassword: newPassword,
      confirmNewPassword: confirmPassword,
    };

    await dispatch(pathchangePassWord(data)).then((value) => {
      if (value.payload.statusCode === 200) {
        toast.success("Cập nhật thành Công");
        setPassword("");
        setConfirmPassword("");
        setNewPassword("");
        setOpenInfoAccount(false);
      }
    });
  };
  return (
    <div className={cx("middle")}>
      <div className={cx("col-12")}>
        <div className={cx("col-8")}>
          <Search />
        </div>
        <div className={cx("col-1")}>
          <TippyHeadless
            render={(attrs) => (
              <div tabIndex="-1" {...attrs}>
                <Popper className={cx("own-menu-list-children")}>
                  <div className={cx("notifications")}>
                    <div style={{ display: "flex" }}>
                      <div className={cx("title-Notifications")}>
                        <p>Thông báo</p>
                      </div>
                      <div
                        className={cx("title-seenAll")}
                        onClick={handleSeenAll}
                      >
                        <p>Xem tất cả</p>
                      </div>
                    </div>
                    {allNotificationsDoctor?.map((n, index) => {
                      return (
                        <div key={n.id}>
                          {n.isRead === false ? (
                            <>
                              <div
                                style={{
                                  background: "#C0C0C0",
                                }}
                                onClick={() => handleReal(n)}
                              >
                                <div className={cx("content")}>
                                  <NotificationsNoneOutlinedIcon
                                    className={cx("item-content")}
                                    sx={{ fontSize: 30 }}
                                  />
                                  <div className={cx("content-notifications")}>
                                    <div className={cx("content-title")}>
                                      {n?.title}
                                    </div>
                                    {n?.content}
                                  </div>
                                </div>
                                {n.url === null ? null : (
                                  <>
                                    {n.typeNotification === "SYSTEM" ? (
                                      <div className={cx("date-content")}>
                                        <a href={n?.url}>{n?.url}</a>
                                      </div>
                                    ) : (
                                      <div className={cx("date-content")}>
                                        <a href={n?.url}>
                                          Địa chỉ hiện tại của bệnh nhân
                                        </a>
                                      </div>
                                    )}
                                  </>
                                )}
                                <div className={cx("date-content")}>
                                  {moment(n?.dateOfBirth).format("DD/MM/YYYY")}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              {n.typeNotification === "EMERGENCY" ? (
                                <div onClick={() => handleReal(n)}>
                                  <div className={cx("col-sm-12")}>
                                    <div
                                      className={cx(
                                        "alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                                      )}
                                      role="alert"
                                      data-brk-library="component__alert"
                                    >
                                      <div className={cx("content")}>
                                        <ErrorOutlineIcon
                                          className={cx("item-content")}
                                          sx={{ fontSize: 30 }}
                                        />
                                        {/* <NotificationsIcon
                                          className={cx("item-content")}
                                          sx={{ fontSize: 30 }}
                                        /> */}
                                        <div
                                          className={cx(
                                            "content-notifications"
                                          )}
                                        >
                                          <div className={cx("content-title")}>
                                            {n?.title}
                                          </div>
                                          {n?.content}
                                        </div>
                                      </div>
                                      <div className={cx("date-content")}>
                                        <a href={n?.url}>
                                          Địa chỉ hiện tại của bệnh nhân
                                        </a>
                                      </div>
                                      <div className={cx("date-content")}>
                                        {moment(n?.dateOfBirth).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}

                              {n.typeNotification === "WARNING" ? (
                                <div onClick={() => handleReal(n)}>
                                  <div className={cx("col-sm-12")}>
                                    <div
                                      className={cx(
                                        "alert fade alert-simple alert-warning alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                                      )}
                                      role="alert"
                                      data-brk-library="component__alert"
                                    >
                                      <div className={cx("content")}>
                                        <WarningIcon
                                          className={cx("item-content")}
                                          sx={{ fontSize: 30 }}
                                        />
                                        <div
                                          className={cx(
                                            "content-notifications"
                                          )}
                                        >
                                          <div className={cx("content-title")}>
                                            {n?.title}
                                          </div>
                                          {n?.content}
                                        </div>
                                      </div>
                                      <div className={cx("date-content")}>
                                        {moment(n?.dateOfBirth).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                              {n.typeNotification === "APPOINTMENT" ? (
                                <div onClick={() => handleReal(n)}>
                                  <div className={cx("col-sm-12")}>
                                    <div
                                      className={cx(
                                        "alert fade alert-simple alert-primary alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                                      )}
                                      role="alert"
                                      data-brk-library="component__alert"
                                    >
                                      <div className={cx("content")}>
                                        <ThumbUpAltIcon
                                          className={cx("item-content")}
                                          sx={{ fontSize: 30 }}
                                        />
                                        <div
                                          className={cx(
                                            "content-notifications"
                                          )}
                                        >
                                          <div className={cx("content-title")}>
                                            {n?.title}
                                          </div>
                                          {n?.content}
                                        </div>
                                      </div>
                                      <div className={cx("date-content")}>
                                        {moment(n?.dateOfBirth).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                              {n.typeNotification === "SYSTEM" ? (
                                <div onClick={() => handleReal(n)}>
                                  <div className={cx("col-sm-12")}>
                                    <div
                                      className={cx(
                                        "alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                                      )}
                                      role="alert"
                                      data-brk-library="component__alert"
                                    >
                                      <div className={cx("content")}>
                                        <CheckIcon
                                          className={cx("item-content")}
                                          sx={{ fontSize: 30 }}
                                        />
                                        <div
                                          className={cx(
                                            "content-notifications"
                                          )}
                                        >
                                          <div className={cx("content-title")}>
                                            {n?.title}
                                          </div>
                                          {n?.content}
                                        </div>
                                      </div>
                                      <div className={cx("date-content")}>
                                        {moment(n?.dateOfBirth).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Popper>
              </div>
            )}
            interactive
            trigger="click"
            placement="bottom-start"
            offset={[-20, 10]}
          >
            <Tippy
              className={cx("tool-tip")}
              content="Thông báo"
              delay={[200, 0]}
            >
              {index === 0 ? (
                <NotificationsNoneOutlinedIcon
                  className={cx("item-notifications")}
                  sx={{ fontSize: 30 }}
                />
              ) : (
                <NotificationsNoneOutlinedIcon
                  className={cx("item-notifications-index")}
                  sx={{ fontSize: 30 }}
                />
              )}
            </Tippy>
          </TippyHeadless>
          {index === 0 ? null : (
            <div className={cx("size-notifications")}>
              <div className={cx("index-notifications")}>{index}</div>
            </div>
          )}
        </div>
        <div className={cx("col-3")}>
          <ul className={cx("nav")}>
            <li>
              <Avatar className={cx("avatar")}>N</Avatar>
            </li>
            <li>
              <div className={cx("name-subMenu")}>
                <div>
                  {userDoctor.role === "DOCTOR" ? (
                    <h4 className={cx("name")}>{nameDoctor}</h4>
                  ) : (
                    <h4 className={cx("name")}>{name}</h4>
                  )}
                </div>
                <div>
                  <ArrowDropDownIcon
                    className={cx("subInfo")}
                    sx={{ fontSize: 40 }}
                  ></ArrowDropDownIcon>
                </div>
              </div>
              <ul className={cx("subNav")}>
                <li>
                  <ItemLeft>
                    <div className={cx("group-item")}>
                      <div>
                        <PersonIcon className={cx("icon")} />
                      </div>
                      <div>
                        <h1 className={cx("modelInfor")}>
                          <ModelInfoAccount user={user} />
                        </h1>
                      </div>
                    </div>
                  </ItemLeft>
                </li>
                <li>
                  <ItemLeft>
                    <div
                      className={cx("group-item")}
                      onClick={handleUpdatePassWord}
                    >
                      <div>
                        <GppGoodIcon className={cx("icon")} />
                      </div>
                      <div>
                        <h1>Cập nhập mật khẩu</h1>
                      </div>
                    </div>
                    <ModelWrapper
                      className={cx("model-info-acc")}
                      open={openInfoAccount}
                      onClose={handleModelCloseInfoAccount}
                    >
                      <div className={cx("model-info-acc-bg")}>
                        <h1 className={cx("model-tile")}>Thay đổi mật khẩu</h1>

                        <form
                          className={cx("model-form")}
                          onSubmit={handleSubmit(handleModelUpdatePass)}
                        >
                          <label>Mật khẩu cũ</label>
                          <input
                            className={cx("model-input")}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label>Mật khẩu mới</label>
                          <input
                            className={cx("model-input")}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />

                          <label>Nhập lại mật khẩu mới</label>
                          <input
                            className={cx("model-input")}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <button
                            className={cx("btn-cancel")}
                            onClick={handleModelCloseInfoAccount}
                          >
                            Hủy
                          </button>
                          <button className={cx("btn-change")}>
                            Cập nhật mật khẩu
                          </button>
                        </form>
                      </div>
                    </ModelWrapper>
                  </ItemLeft>
                </li>
                <li>
                  <ItemLeft>
                    <div className={cx("group-item")}>
                      <div>
                        <EditIcon className={cx("icon")} />
                      </div>

                      <div>
                        <h1>Thông tin phiên bản</h1>
                      </div>
                    </div>
                  </ItemLeft>
                </li>
                <li>
                  <ItemLeft>
                    <div className={cx("group-item")}>
                      <div>
                        <LogoutIcon className={cx("icon")} />
                      </div>

                      <div>
                        <h1>Đăng xuất</h1>
                      </div>
                    </div>
                  </ItemLeft>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx("Center")}>
        <Information />
      </div>
    </div>
  );
};

export default Middle;
