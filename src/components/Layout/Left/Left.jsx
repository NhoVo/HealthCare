import React from "react";
import classNames from "classnames/bind";
import styles from "./Left.module.scss";
import images from "../../../assets/images/index";
import ItemLeft from "../../ItemLeft/ItemLeft";
import EditIcon from "@mui/icons-material/Edit";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
const cx = classNames.bind(styles);

const Left = () => {
  return (
    <div className={cx("left")}>
      <div className={cx("Logo")}>
        <img src={images.logo} alt="" />
        <h1>N&S HealthCase</h1>
      </div>
      <div className={cx("separator")}></div>
      <ItemLeft>
        <div className={cx("group-item")}>
          <EditIcon className={cx("icon")} />
          <h1>Thông tin</h1>
        </div>
      </ItemLeft>
      <ItemLeft>
        <div className={cx("group-item")}>
          <ChatIcon className={cx("icon")} />
          <h1>Hội thoại</h1>
        </div>
      </ItemLeft>
      <ItemLeft>
        <div className={cx("group-item")}>
          <FormatListBulletedIcon className={cx("icon")} />
          <h1>Danh sách bệnh nhân</h1>
        </div>
      </ItemLeft>
      <ItemLeft>
        <div className={cx("group-item")}>
          <CalendarMonthIcon className={cx("icon")} />
          <h1>Danh sách lịch hẹn</h1>
        </div>
      </ItemLeft>
      <ItemLeft>
        <div className={cx("group-item")}>
          <PersonIcon className={cx("icon")} />
          <h1>Thông tin cái nhân</h1>
        </div>
      </ItemLeft>
      <ItemLeft>
        <div className={cx("group-item")}>
          <LogoutIcon className={cx("icon")} />
          <h1>Đăng xuất</h1>
        </div>
      </ItemLeft>
    </div>
  );
};

export default Left;
