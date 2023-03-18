// libs
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeIcon from "@mui/icons-material/Home";
import {
  faComment,
  faAddressBook,
  faGear,
  faSquareCheck,
  faVideo,
  faToolbox,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import images from "../../../assets/images/index";
// me
import styles from "./Sidebar.module.scss";

import Menu from "../../Popper/Menu/Menu";
import MenuSetting from "./Menu/Menu";
const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div className={cx("wrapper")}>
      {/* top */}
      <div className={cx("sidebar-top")}>
        <div className={cx("avatar")}>
          <img className={cx("avatar-img")} src={images.logo} alt="avatar" />
        </div>

        <div className={cx("option-items")}>
          <Tippy
            className={cx("tool-tip")}
            content="To-do"
            delay={[200, 0]}
            placement="bottom-end"
            offset={[40, -6]}
          >
            <NavLink
              className={(nav) => cx("option-item", { active: nav.isActive })}
              to="/Home"
            >
              {/* <FontAwesomeIcon icon={faSquareCheck} /> */}
              <HomeIcon sx={{ fontSize: 40 }} />
            </NavLink>
          </Tippy>
          <Tippy
            className={cx("tool-tip")}
            content="Tin nhắn"
            delay={[200, 0]}
            placement="bottom-end"
            offset={[40, -8]}
          >
            <NavLink
              className={(nav) => cx("option-item", { active: nav.isActive })}
              to="/ChatHome"
            >
              <FontAwesomeIcon icon={faComment} />
              {/* <span className={cx('badge')}>5+</span> */}
            </NavLink>
          </Tippy>
        </div>
      </div>
      {/* bottom */}
    </div>
  );
}

export default Sidebar;
