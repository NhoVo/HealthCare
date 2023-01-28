import React from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
const cx = classNames.bind(styles);

const Search = () => {
  return (
    <div className={cx("form-search")}>
      <div
        className={cx(
          "row height d-flex justify-content-center align-items-center"
        )}
      >
        <div className={cx("col-md-6")}>
          <div className={cx("form")}>
            <SearchIcon className={cx("search")} />
            <input
              type="text"
              className={cx("form-control form-input")}
              placeholder="Tìm kiếm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
