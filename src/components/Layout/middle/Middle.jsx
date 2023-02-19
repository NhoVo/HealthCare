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
import { userLogin } from "../../../Redux/selector";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

const Middle = () => {
  const user = useSelector(userLogin);
  return (
    <div className={cx("middle")}>
      <div className={cx("col-12")}>
        <div className={cx("col-8 ")}>
          <Search />
        </div>
        <div className={cx("col-1")}>
          <NotificationsIcon
            className={cx("item-notifications")}
            sx={{ fontSize: 30 }}
          />
        </div>
        <div className={cx("col-3 ")}>
          <ul className={cx("nav")}>
            <li>
              <Avatar className={cx("avatar")}>N</Avatar>
            </li>
            <li>
              <div className={cx("name-subMenu")}>
                <div>
                  <h4 className={cx("name")}> {user.fullName}</h4>
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
