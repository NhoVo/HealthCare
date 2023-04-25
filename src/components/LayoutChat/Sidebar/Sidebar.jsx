// libs
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import "tippy.js/dist/tippy.css";

import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";
// me
import styles from "./Sidebar.module.scss";
import { useSelector } from "react-redux";
import { userLogin } from "../../../Redux/selector";

const cx = classNames.bind(styles);

function Sidebar() {
  const user = useSelector(userLogin);
  return (
    <div className={cx("wrapper")}>
      {/* top */}
      <div className={cx("sidebar-top")}>
        <div className={cx("avatar")}>
          <img
            className={cx("avatar-img")}
            src={user.role === "DOCTOR" ? user?.doctor?.avatar : user?.avatar}
            alt="avatar"
          />
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
