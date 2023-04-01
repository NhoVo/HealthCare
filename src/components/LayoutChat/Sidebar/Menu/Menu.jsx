// libs
import TippyHeadless from "@tippyjs/react/headless";
import classNames from "classnames/bind";

// me
import MenuSettingItem from "../../../LayoutChat/Sidebar/Menu/MenuItem";
import Popper from "../../../Popper/Popper";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function Menu({ children, user }) {
  return (
    <TippyHeadless
      render={(attrs) => (
        <div tabIndex="-1" {...attrs}>
          {/* Popper Menu parent */}
          <Popper className={cx("menu-popper")}>
            <MenuSettingItem user={user} />
          </Popper>
        </div>
      )}
      delay={[0, 100]}
      placement="top-end"
      trigger="click"
      interactive
    >
      {children}
    </TippyHeadless>
  );
}

export default Menu;
