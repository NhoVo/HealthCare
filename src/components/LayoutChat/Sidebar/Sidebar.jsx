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
          <Menu>
            <img className={cx("avatar-img")} src={images.logo} alt="avatar" />
          </Menu>
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
          <Tippy
            className={cx("tool-tip")}
            content="Danh bạ"
            delay={[200, 0]}
            placement="bottom-end"
            offset={[40, -6]}
          >
            <NavLink
              className={(nav) => cx("option-item", { active: nav.isActive })}
              to="/phonebook"
              onClick={() => {
                //reset conversation & user saving
                // dispatch(listGroupUsers.actions.clickConversation(null));
                // dispatch(userSlice.actions.setUserClick(null));
              }}
            >
              <FontAwesomeIcon icon={faAddressBook} />
            </NavLink>
          </Tippy>

          <Tippy
            className={cx("tool-tip")}
            content="Za-vi"
            delay={[200, 0]}
            placement="bottom-end"
            offset={[40, -6]}
          >
            <NavLink className={cx("option-item")} to="#">
              <FontAwesomeIcon icon={faVideo} />
            </NavLink>
          </Tippy>
        </div>
      </div>

      {/* bottom */}
      <div className={cx("sidebar-bottom")}>
        <Tippy
          className={cx("tool-tip")}
          content="Cloud"
          delay={[200, 0]}
          placement="bottom-end"
          offset={[40, -6]}
        >
          <NavLink className={cx("option-item")} to="#">
            <FontAwesomeIcon icon={faCloud} />
          </NavLink>
        </Tippy>
        <Tippy
          className={cx("tool-tip")}
          content="Công cụ"
          delay={[200, 0]}
          placement="bottom-end"
          offset={[40, -6]}
        >
          <NavLink className={cx("option-item")} to="#">
            <FontAwesomeIcon icon={faToolbox} />
          </NavLink>
        </Tippy>
        <MenuSetting>
          <Tippy
            className={cx("tool-tip")}
            content="Cài đặt"
            delay={[200, 0]}
            placement="right-end"
          >
            {/* Add div fix warning of Tippy */}
            <div>
              <FontAwesomeIcon className={cx("option-item")} icon={faGear} />
            </div>
          </Tippy>
        </MenuSetting>
      </div>
    </div>
  );
}

export default Sidebar;
