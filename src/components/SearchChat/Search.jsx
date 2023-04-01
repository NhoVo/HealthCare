import Tippy from "@tippyjs/react";
import TippyHeadless from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useState } from "react";
import "tippy.js/dist/tippy.css";

import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
  faUserGroup,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// me
import styles from "./Search.module.scss";

import AddFriend from "../AddFriend/AddFriend";
import AddGroup from "../AddGroup/AddGroup";

import ModelWrapper from "../ModelWrapper/ModelWrapper";
import Popper from "../Popper/Popper";
const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openInfoAccount, setOpenInfoAccount] = useState(false);
  const [openAddGroup, setOpenAddGroup] = useState(false);

  // useEffect(() => {
  //     if (!searchValue.trim()) {
  //         return;
  //     }

  //     setLoading(true);
  //     //setSearchResult([userSearching[0], userSearching[0]._id]);
  //     setLoading(false);
  // }, [dispatch, searchValue]);

  // Handle change value input
  const searchNamePhoneNumber = (e) => {
    // if (e.key === "Enter") {
    //   if (userSearching && userSearching !== 1) {
    //     setShowResult(true);
    //     setSearchResult(userSearching[0]);
    //     console.log(searchResult);
    //   } else {
    //     alert("Không tìm thấy");
    //   }
    // }
    console.log("ok");
  };

  // Handle button clear text
  const handleBtnClearText = () => {
    setSearchValue("");
  };

  // Handle close result search
  const handleCloseResultSearch = () => {
    setShowResult(false);

    setSearchValue("");
  };
  const handleModelOpenInfoAccount = () => {
    setOpenInfoAccount(true);
  };
  const handleModelCloseInfoAccount = () => {
    setOpenInfoAccount(false);
  };

  const handleModelOpenAddGroup = () => {
    setOpenAddGroup(true);
  };
  const handleModelCloseOpenAddGroup = () => {
    setOpenAddGroup(false);
  };
  //
  const handleCallback = () => {
    // const data = {
    //     status: true,
    //     senderID: infoUser._id,
    //     idRequest: meRequest[0].idFriendRequest,
    // };
    // dispatch(fetchApiRecallRequestAddFriend(data));
    // toast.success('Bạn đã thu hồi lời mời kết bạn.');
  };
  const handleRequest = () => {
    // const data = { senderID: infoUser._id, receiverID: searchResult._id };
    // let tam = dispatch(friendRequests(data));
    // if (tam) {
    //   toast.success("Gửi lời mời kết bạn thành công.");
    //   dispatch(filterSlice.actions.searchFilterChange(null));
    // }
    // setShowResult(false);
    // setSearchValue("");
    console.log("ok");
  };
  return (
    <div className={cx("wrapper")}>
      <TippyHeadless
        render={(attrs) => (
          <div tabIndex="-1" {...attrs}>
            <Popper className={cx("menu-list-search")}>
              <div className={cx("menu-search-title")}>Trò chuyện</div>
              {/* Render result search */}
              <div className={cx("list-conversation")}>
                <img
                  className={cx("avatar-img")}
                  src={searchResult.avatar}
                  alt="avatar"
                />
                <div className={cx("content")}>
                  <h4 className={cx("username")}>{searchResult.fullName}</h4>
                  <p className={cx("message")}>{searchResult.phoneNumber}</p>
                </div>
                {searchResult?._id ? null : (
                  <>
                    {true ? (
                      <>
                        {0 ? (
                          <div className={cx("result-add-friend")}>
                            <button onClick={handleCallback}>Thu hồi</button>
                          </div>
                        ) : (
                          <div className={cx("result-add-friend")}>
                            <button onClick={handleRequest}>Kết bạn</button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={cx("result-friend")}>
                        <p>Bạn bè</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Popper>
          </div>
        )}
        placement="bottom-start"
        interactive
        visible={showResult}
      >
        <div className={cx("search")}>
          <FontAwesomeIcon
            className={cx("icon-search")}
            icon={faMagnifyingGlass}
          />
          <input
            type="text"
            className={cx("input-search")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={searchNamePhoneNumber}
            // ref={searchRef}
            placeholder="Tìm kiếm"
          />

          {/* Button clear */}
          {!!searchValue && !loading && (
            <button className={cx("clear-btn")} onClick={handleBtnClearText}>
              <FontAwesomeIcon
                className={cx("clear-icon")}
                icon={faCircleXmark}
              />
            </button>
          )}

          {/* Icon loading */}
          {loading && (
            <FontAwesomeIcon className={cx("loading-icon")} icon={faSpinner} />
          )}

          {/* Button close result search */}
          {showResult ? (
            <button
              className={cx("close-result-search-btn")}
              onClick={handleCloseResultSearch}
            >
              Đóng
            </button>
          ) : (
            <div className={cx("items")}>
              <Tippy
                className={cx("tool-tip")}
                content="Thêm bạn"
                delay={[200, 0]}
              >
                <button className={cx("btn-click-icon")}>
                  <FontAwesomeIcon
                    className={cx("item")}
                    icon={faUserPlus}
                    onClick={handleModelOpenInfoAccount}
                  />
                </button>
              </Tippy>
              <Tippy
                className={cx("tool-tip")}
                content="Tạo nhóm chat"
                delay={[200, 0]}
              >
                <button className={cx("btn-click-icon")}>
                  <FontAwesomeIcon
                    className={cx("item")}
                    icon={faUserGroup}
                    onClick={handleModelOpenAddGroup}
                  />
                </button>
              </Tippy>
            </div>
          )}
        </div>
      </TippyHeadless>
      <ModelWrapper
        className={cx("model-add-friend")}
        open={openInfoAccount}
        onClose={handleModelCloseInfoAccount}
      >
        <div className={cx("model-add-friend-bg")}>
          <div className={cx("add-friend-title")}>
            <span className={cx("friend-title")}>Thêm bạn</span>
            <button className={cx("close-btn")}>
              <FontAwesomeIcon
                className={cx("friend-close-ic")}
                icon={faXmark}
                onClick={handleModelCloseInfoAccount}
              />
            </button>
          </div>
          <AddFriend />
        </div>
      </ModelWrapper>

      {/* Tạo nhóm */}
      <ModelWrapper
        className={cx("model-add-friend")}
        open={openAddGroup}
        onClose={handleModelCloseOpenAddGroup}
      >
        <div className={cx("model-add-group-bg")}>
          <div className={cx("add-friend-title")}>
            <span className={cx("friend-title")}>Tạo nhóm</span>
            <button className={cx("close-btn")}>
              <FontAwesomeIcon
                className={cx("friend-close-ic")}
                icon={faXmark}
                onClick={handleModelCloseOpenAddGroup}
              />
            </button>
          </div>
          <AddGroup />
        </div>
      </ModelWrapper>
    </div>
  );
}

export default Search;
