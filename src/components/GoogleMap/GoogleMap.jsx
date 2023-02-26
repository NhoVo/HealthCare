import React from "react";
import classNames from "classnames/bind";
import styles from "./GoogleMap.module.scss";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { useEffect } from "react";

import { HiLocationMarker } from "react-icons/hi";
import { MdOutlineAddLocation } from "react-icons/md";
const Position = ({ text }) => <div>{text}</div>;
const cx = classNames.bind(styles);

const GoogleMap = ({ coords, address }) => {
  //   const [coordinates, setCoordinates] = useState(null);
  //   const userD = useSelector(userDoctorPatient);
  //   console.log(userD);
  console.log(coords);
  // console.log(address);

  return (
    <div className={cx("title")} style={{ height: "300px", width: "1000px" }}>
      <div></div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
        defaultCenter={coords}
        defaultZoom={11}
        center={coords}
      >
        <Position
          lat={coords?.lat}
          lng={coords?.lng}
          text={<HiLocationMarker color="red" size={"30px"} />}
        />

        <Position
          lat={10.82221328865831}
          lng={106.68684506946747}
          text={
            <HiLocationMarker
              color="black"
              size={"30px"}
              className={cx("map-patientBook")}
            />
          }
        />

        {/* <div className={cx("map-address")}>okok</div> */}

        <Position
          lat={10.817847838435899}
          lng={106.68003607706068}
          text={<MdOutlineAddLocation color="red" size={"30px"} />}
        />
        <Position
          lat={10.834859333915526}
          lng={106.66189322583296}
          text={<MdOutlineAddLocation color="red" size={"30px"} />}
        />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
