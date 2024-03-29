import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Search.module.scss";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";
import { MdOutlineAddLocation } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { searchGG, searchGGMap } from "../../Redux/Features/filter/searchgg";
import { resultSearchGG, resultSearchGGMap } from "../../Redux/selector";
import ModelWrapper from "../ModelWrapper/ModelWrapper";
import data from "../../data.json";
const cx = classNames.bind(styles);
const Position = ({ text }) => <div>{text}</div>;

const Search = () => {
  const [search, setSearch] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const [tam, setTam] = useState(false);

  const [coords, setCoords] = useState(null);

  const result = useSelector(resultSearchGG);
  const resultMap = useSelector(resultSearchGGMap);

  const [suggestions, setSuggestions] = useState(data);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({
          lat: latitude,
          lng: longitude,
        });
      }
    );
  }, [openInfo === true]);

  const handleModelCloseInfo = () => {
    setOpenInfo(false);
    setSearch("");
    setSuggestions(data);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    setOpenInfo(true);
    dispatch(searchGG(search));
    dispatch(searchGGMap(search));
  };
  const handleChange = (e) => {
    const { value } = e.target;
    let newSuggestions = [];
    if (value.length > 0) {
      newSuggestions = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    setSearch(value);
    setSuggestions(newSuggestions);
    setShowSuggestions(true);
    setTam(true);
  };

  const handleSuggestionClick = (item) => {
    setSearch(item.name);
    setSuggestions(data);
    setShowSuggestions(false);
    setTam(true);
  };
  const handleBlur = () => {
    if (search === "" && tam === true) {
      setShowSuggestions(false);
      setSuggestions(data);
    }

    // Khi người dùng click ra ngoài vùng input, ẩn gợi ý
  };
  return (
    <div className={cx("form-search")}>
      <div className={cx("row height d-flex align-items-center")}>
        <div className={cx("col-md-6")}>
          <div className={cx("form")}>
            <div onClick={handleSearch}>
              <SearchIcon className={cx("search")} />
            </div>

            <input
              type="text"
              className={cx("form-control form-input")}
              placeholder="Tìm kiếm"
              value={search}
              onChange={handleChange}
              onClick={() => setShowSuggestions(true)}
              onBlur={handleBlur}
            />
            {showSuggestions && (
              <ul className={cx("suggestions")}>
                {suggestions.map((item) => (
                  <li key={item.id} onClick={() => handleSuggestionClick(item)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <ModelWrapper
        className={cx("model-add-information")}
        open={openInfo}
        onClose={handleModelCloseInfo}
      >
        <div className={cx("model-add-information-bg")}>
          <div className={cx("add-information-title")}>
            <span className={cx("information-title")}>{search}</span>
            <button className={cx("close-btn")}>
              <FontAwesomeIcon
                className={cx("close-ic")}
                icon={faXmark}
                onClick={handleModelCloseInfo}
              />
            </button>
          </div>
          <div className={cx("search-content")}>
            <div className={cx("search-text")}>
              {result?.map((g) => {
                return (
                  <div key={g.position}>
                    <div className={cx("search-text-title")}>
                      <a href={g.link}>{g.title}</a>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className={cx("search-text-snippet")}>
                        {g.snippet}
                      </div>
                      <div className={cx("search-text-img")}>
                        <img
                          className={cx("avatar-img")}
                          src={g.imageUrl}
                          alt="avatar"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {resultMap.length !== 0 && (
              <div className={cx("search-map")}>
                {resultMap?.map((m) => {
                  return (
                    <div key={m.position}>
                      <div
                        className={cx("title")}
                        style={{
                          height: "200px",
                          width: "500px",
                          marginTop: "10px",
                        }}
                      >
                        <GoogleMapReact
                          bootstrapURLKeys={{
                            key: process.env.REACT_APP_MAP_API,
                          }}
                          defaultZoom={11}
                          defaultCenter={coords}
                          center={coords}
                        >
                          <Position
                            lat={coords.lat}
                            lng={coords.lng}
                            text={
                              <HiLocationMarker color="black" size={"30px"} />
                            }
                          />
                          <Position
                            lat={m.latitude}
                            lng={m.longitude}
                            text={
                              <MdOutlineAddLocation color="red" size={"30px"} />
                            }
                          />
                        </GoogleMapReact>
                      </div>
                      <div className={cx("search-map-name")}>{m.category}</div>
                      <div style={{ display: "flex" }}>
                        <div className={cx("search-map-rating1")}>
                          Đánh giá:
                        </div>
                        <ReactStars
                          count={5}
                          // onChange={ratingChanged}
                          value={m.rating}
                          size={18}
                          activeColor="#ffd700"
                        />
                        <div className={cx("search-map-rating")}>
                          {m.ratingCount}
                        </div>
                      </div>
                      <div className={cx("search-map-address")}>
                        Địa Chỉ: {m.address}
                      </div>
                      <div className={cx("search-map-phone")}>
                        Số điện thoại: {m.phoneNumber}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </ModelWrapper>
    </div>
  );
};

export default Search;
