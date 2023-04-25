// libs
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React from "react";

// me
import FileMessage from "../FileMessage/FileMessage";
import styles from "./ItemStored.module.scss";

const cx = classNames.bind(styles);

function ItemStored({ message, isLink }) {
  return (
    <div className={cx("list-item-stored")}>
      <div className={cx("header")}>
        <span className={cx("header-title")}>{isLink ? "Link" : "File"}</span>
        <FontAwesomeIcon className={cx("icon")} icon={faCaretDown} />
      </div>
      <div className={cx("body")}>
        {/* render image (map) after */}
        <div className={cx("body-list-item-stored")}>
          <div className={cx("right-container")}>
            {isLink ? (
              <>
                <div className={cx("title-name")}>Name url</div>
                <div className={cx("info-link")}>www.react</div>
              </>
            ) : (
              <>
                <FileMessage message={message} />
              </>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className={cx("footer")}>
        <button className={cx("footer-btn-all")}>Xem tất cả</button>
      </div>
    </div>
  );
}

export default ItemStored;
