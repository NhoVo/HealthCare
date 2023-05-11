import classNames from "classnames/bind";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import styles from "./GoogleMap.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { HiLocationMarker } from "react-icons/hi";
import axios from "axios";

import useDebounce from "../hooks/useDebounce";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllHospital,
  fetchSearchHospital,
} from "../../Redux/Features/GoogleMap/GoogleMap";
import { SearchSiteHospital, listHospital } from "../../Redux/selector";
const Position = ({ text }) => <div>{text}</div>;
const cx = classNames.bind(styles);

const GoogleMap = ({ coords, user }) => {
  const [centers, setCenters] = useState({
    lat: "",
    lng: "",
    address: "",
  });

  const hospitals = useSelector(listHospital);

  const [resultSearch, setResultSearch] = useState("");

  const debouncedValue = useDebounce(coords, 20000);
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      lat: coords?.lat,
      lng: coords?.lng,
    };
    // Chuỗi HTML trả về từ
    dispatch(fetchAllHospital(data));
    // setHospitals(response.data.results);
  }, [coords, debouncedValue]);
  const handleApiLoadedPatient = (map, maps) => {
    if (hospitals && hospitals.length > 0) {
      for (const hospital of hospitals) {
        const marker = new maps.Marker({
          position: {
            lat: hospital.geometry?.location?.lat,
            lng: hospital.geometry?.location?.lng,
          },
          map,
          title: hospital.name,
        });

        // Create an info window for each marker
        const infowindow = new maps.InfoWindow({
          content: hospital.name,
        });
        // Add a click event listener to each marker to open the info window
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      }
    }
  };
  const handleApiLoaded = (map, maps) => {
    if (hospitals && hospitals.length > 0) {
      for (const hospital of hospitals) {
        const marker = new maps.Marker({
          position: {
            lat: hospital.geometry?.location?.lat,
            lng: hospital.geometry?.location?.lng,
          },
          map,
          title: hospital.name,
        });

        // Create an info window for each marker
        const infowindow = new maps.InfoWindow({
          content: hospital.name,
        });

        // Add a click event listener to each marker to open the info window
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      }
    }
  };

  const handleSearch = async () => {
    if (resultSearch === "") {
      setCenters({
        lat: coords?.lat,
        lng: coords?.lng,
      });
    }

    dispatch(fetchSearchHospital(resultSearch)).then((v) => {
      console.log("---------", v.payload);
      const result = v.payload;
      const lat = result[0]?.geometry.location.lat;
      const lng = result[0]?.geometry.location.lng;
      const address = result[0]?.formatted_address;
      setCenters({ lat, lng, address });
    });
  };

  return (
    <>
      {user?.role === "DOCTOR" ? (
        <>
          <div className={cx("form-sum")}>
            <div className={cx("search")}>
              <input
                type="text"
                className={cx("search-input")}
                placeholder="Tìm kiếm"
                value={resultSearch}
                onChange={(e) => setResultSearch(e.target.value)}
              />
              <button className={cx("search-button")} onClick={handleSearch}>
                <SearchIcon sx={{ width: 30 }} />
              </button>
            </div>
            <div
              className={cx("title")}
              style={{
                height: "655px",
                width: "1147px",
                marginLeft: "1px",
                marginTop: "1px",
              }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                defaultZoom={11}
                center={coords}
                onGoogleApiLoaded={({ map, maps }) =>
                  handleApiLoaded(map, maps)
                }
              >
                <Position
                  lat={coords?.lat}
                  lng={coords?.lng}
                  text={<HiLocationMarker color="black" size={"30px"} />}
                />

                <Position
                  lat={centers?.lat}
                  lng={centers?.lng}
                  text={
                    <div
                      className={cx("marker-icon")}
                      onMouseEnter={() => setShowInfo(true)}
                      onMouseLeave={() => setShowInfo(false)}
                    >
                      <HiLocationMarker color="black" size={"30px"} />
                      <div
                        className={cx("siteUser")}
                        style={{ display: showInfo ? "block" : "none" }}
                      >
                        {centers?.address}
                        <br />
                        <span>
                          <DirectionsIcon
                            sx={{
                              fontSize: 20,
                              color: "blue",
                              cursor: "point",
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  }
                />
              </GoogleMapReact>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={cx("form-sum")}>
            <div className={cx("search")}>
              <input
                type="text"
                className={cx("search-input")}
                placeholder="Tìm kiếm"
                value={resultSearch}
                onChange={(e) => setResultSearch(e.target.value)}
              />
              <button className={cx("search-button")} onClick={handleSearch}>
                <SearchIcon sx={{ width: 30 }} />
              </button>
            </div>
            <div
              className={cx("title")}
              style={{ height: "310px", width: "1000px" }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                // defaultCenter={coords}
                defaultZoom={11}
                center={coords}
                onGoogleApiLoaded={({ map, maps }) =>
                  handleApiLoadedPatient(map, maps)
                }
              >
                <Position
                  lat={coords?.lat}
                  lng={coords?.lng}
                  text={
                    <>
                      <HiLocationMarker color="black" size={"30px"} />
                    </>
                  }
                />
                <Position
                  lat={centers?.lat}
                  lng={centers?.lng}
                  text={
                    <div
                      className={cx("marker-icon")}
                      onMouseEnter={() => setShowInfo(true)}
                      onMouseLeave={() => setShowInfo(false)}
                    >
                      <HiLocationMarker color="black" size={"30px"} />
                      <div
                        className={cx("siteUser")}
                        style={{ display: showInfo ? "block" : "none" }}
                      >
                        {centers?.address}
                        <br />
                        <DirectionsIcon sx={{ fontSize: 20, color: "blue" }} />
                      </div>
                    </div>
                  }
                />
              </GoogleMapReact>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GoogleMap;
