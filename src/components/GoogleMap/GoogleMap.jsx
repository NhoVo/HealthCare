import classNames from "classnames/bind";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import styles from "./GoogleMap.module.scss";
import SearchIcon from "@mui/icons-material/Search";

import { HiLocationMarker } from "react-icons/hi";

import axios from "axios";

import useDebounce from "../hooks/useDebounce";
import { FaMapMarkerAlt } from "react-icons/fa";

const AnyReactComponent = ({ text }) => (
  <div>
    <FaMapMarkerAlt />
    {text}
  </div>
);
const Position = ({ text }) => <div>{text}</div>;
const cx = classNames.bind(styles);

const GoogleMap = ({ coords, user }) => {
  const [centers, setCenters] = useState({
    lat: "",
    lng: "",
  });
  // const centers = {
  //   lat: coords?.lat,
  //   lng: coords?.lng,
  // };
  const [hospitals, setHospitals] = useState([]);
  const [resultSearch, setResultSearch] = useState("");
  const debouncedValue = useDebounce(coords, 10000);
  useEffect(() => {
    const getHospitals = async () => {
      try {
        const url = `/maps/api/place/nearbysearch/json`;
        const params = {
          location: `${coords?.lat},${coords?.lng}`, //"10.820431509874297, 106.68668066437624",
          radius: 5000, // bán kính 20km
          type: "hospital                        ",
          key: process.env.REACT_APP_MAP_API,
        };

        let hospitals = [];
        let nextPageToken = null;

        do {
          if (nextPageToken) {
            params.pagetoken = nextPageToken;
          }
          const response = await axios.get(url, { params, timeout: 10000 });
          hospitals = [...hospitals, ...response.data.results];
          nextPageToken = response.data.next_page_token;
        } while (nextPageToken);

        setHospitals(hospitals);
      } catch (error) {
        console.log(error);
      }
    };

    getHospitals();
  }, [coords, debouncedValue]);

  const handleApiLoaded = (map, maps) => {
    hospitals.forEach((hospital) => {
      const marker = new maps.Marker({
        position: {
          lat: hospital.geometry.location.lat,
          lng: hospital.geometry.location.lng,
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
    });
  };
  const handleSearch = async () => {
    console.log(resultSearch);
    if (resultSearch === "") {
      setCenters({
        lat: coords?.lat,
        lng: coords?.lng,
      });
    } else {
      await axios
        .get(
          `maps/api/place/textsearch/json?query=${resultSearch}&key=${process.env.REACT_APP_MAP_API}`
        )
        .then((response) => {
          const result = response.data.results[0];
          const lat = result.geometry.location.lat;
          const lng = result.geometry.location.lng;
          setCenters({ lat, lng });
          console.log(result);
        });
    }
  };
  return (
    <>
      {user?.role === "DOCTOR" ? (
        <>
          <div className={cx("form-sum")}>
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
                      value={resultSearch}
                      onChange={(e) => setResultSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={cx("title")}
              style={{
                height: "665px",
                width: "1147px",
                marginLeft: "1px",
                marginTop: "1px",
              }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                // defaultCenter={coords}
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
                <AnyReactComponent
                  lat={centers.lat}
                  lng={centers.lng}
                  text={"Tên địa điểm"}
                  name={"Tên địa điểm"}
                  //onClick={() => onMarkerClick({ name: "Tên địa điểm" })}
                />
                {/* <Position
                  lat={centers?.lat}
                  lng={centers?.lng}
                  text={<HiLocationMarker color="black" size={"30px"} />}
                /> */}
              </GoogleMapReact>
            </div>
          </div>
        </>
      ) : (
        <div
          className={cx("title")}
          style={{ height: "300px", width: "1000px" }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
            // defaultCenter={coords}
            defaultZoom={11}
            center={coords}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <Position
              lat={coords?.lat}
              lng={coords?.lng}
              text={
                <>
                  <HiLocationMarker color="black" size={"30px"} />
                  <div>Vị trí hiện tại của bạn</div>
                </>
              }
            />
          </GoogleMapReact>
        </div>
      )}
    </>
  );
};

export default GoogleMap;
