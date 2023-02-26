import React from "react";
import classNames from "classnames/bind";
import styles from "./Middle.module.scss";
import Search from "../../Search/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ItemLeft from "../../ItemLeft/ItemLeft";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Information from "../../../page/Information/Information";
import MedicalRecord from "../../../page/MedicalRecord/MedicalRecord";
import { useLocation } from "react-router-dom";
import ModelInfoAccount from "../../ModelWrapper/ModelInfoAccount/ModelInfoAccount";
import { allNotifiDoctor, userLogin } from "../../../Redux/selector";
import { useSelector } from "react-redux";
import TippyHeadless from "@tippyjs/react/headless";
import Popper from "../../Popper/Popper";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { MoreHoriz } from "@mui/icons-material";
import moment from "moment";

const cx = classNames.bind(styles);

const Middle = () => {
  const user = useSelector(userLogin);
  const userDoctor = useSelector(userLogin);
  const allNotificationsDoctor = useSelector(allNotifiDoctor);

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
  return (
    <div className={cx("middle")}>
      <div className={cx("col-12")}>
        <div className={cx("col-8 ")}>
          <Search />
        </div>
        <div className={cx("col-1")}>
          <TippyHeadless
            render={(attrs) => (
              <div tabIndex="-1" {...attrs}>
                <Popper className={cx("own-menu-list-children")}>
                  <div className={cx("notifications")}>
                    <p className={cx("title-Notifications")}> Thông báo</p>
                    <p className={cx("strikethrough")}></p>
                    {allNotificationsDoctor?.map((n) => {
                      return (
                        <div key={n.id}>
                          <div className={cx("content")}>
                            <NotificationsIcon
                              className={cx("item-content")}
                              sx={{ fontSize: 30 }}
                            />
                            <div className={cx("content-notifications")}>
                              {n?.title}
                              <br /> {n?.content}
                            </div>
                          </div>
                          <div className={cx("date-content")}>
                            {moment(n?.dateOfBirth).format("DD/MM/YYYY")}
                          </div>
                          <p className={cx("strikethrough")}></p>
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
            offset={[-200, 2]}
          >
            <Tippy
              className={cx("tool-tip")}
              content="Lựa chọn"
              delay={[200, 0]}
            >
              <NotificationsIcon
                className={cx("item-notifications")}
                sx={{ fontSize: 30 }}
              />
            </Tippy>
          </TippyHeadless>
          <div className={cx("size-notifications")}>
            {allNotificationsDoctor.length}
          </div>
        </div>
        <div className={cx("col-3 ")}>
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
                          <ModelInfoAccount
                            user={user}
                            userDoctor={userDoctor}
                          />
                        </h1>
                      </div>
                    </div>
                  </ItemLeft>
                </li>
                <li>
                  <ItemLeft>
                    <div className={cx("group-item")}>
                      <div>
                        <SettingsIcon className={cx("icon")} />
                      </div>

                      <div>
                        <h1>Cập nhập thông tin</h1>
                      </div>
                    </div>
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
