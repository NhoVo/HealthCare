import classNames from "classnames/bind";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import styles from "./GoogleMap.module.scss";

import { HiLocationMarker } from "react-icons/hi";
import { MdOutlineAddLocation } from "react-icons/md";
import axios from "axios";

import { InfoWindow, Marker } from "google-maps-react";
import { Client } from "@googlemaps/google-maps-services-js";
const Position = ({ text }) => <div>{text}</div>;
const cx = classNames.bind(styles);

const GoogleMap = ({ coords, addressP }) => {
  //console.log(places);
  // console.log("coords", coords);
  //   {
  //     "lat": 10.82047365338494,
  //     "lng": 106.68671388212508
  // }
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const getHospitals = async () => {
      try {
        const url = `/maps/api/place/nearbysearch/json`;

        const params = {
          location: `${coords?.lat},${coords?.lng}`, //"10.820431509874297, 106.68668066437624",
          radius: 20000, // bán kính 20km
          type: "hospital",
          key: process.env.REACT_APP_MAP_API,
        };
        console.log("params", params.location);
        let hospitals = [];
        let nextPageToken = null;

        do {
          if (nextPageToken) {
            params.pagetoken = nextPageToken;
          }
          const response = await axios.get(url, { params, timeout: 5000 });
          hospitals = [...hospitals, ...response.data.results];
          nextPageToken = response.data.next_page_token;
        } while (nextPageToken);

        setHospitals(hospitals);
      } catch (error) {
        console.log(error);
      }
    };

    getHospitals();
  }, [coords]);

  const handleApiLoaded = (map, maps) => {
    // Create a marker for each hospital
    console.log("hospitals", hospitals);
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
  return (
    <div className={cx("title")} style={{ height: "300px", width: "1000px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
        defaultCenter={coords}
        defaultZoom={11}
        center={coords}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <Position
          lat={coords?.lat}
          lng={coords?.lng}
          text={<HiLocationMarker color="black" size={"30px"} />}
        />
        {/* {hospitals.map((hospital) => {
          return (
            <Position
              key={hospital.place_id}
              lat={hospital.geometry.location.lat}
              lng={hospital.geometry.location.lng}
              text={
                <MdOutlineAddLocation
                  color="red"
                  size={"30px"}
                  // onClick={() => setSelectedHospital(hospital)}
                />
              }
            />
          );
        })} */}
        {/* {selectedHospital && (
          <InfoWindow
            position={{
              lat: selectedHospital.geometry.location.lat,
              lng: selectedHospital.geometry.location.lng,
            }}
            onCloseClick={() => setSelectedHospital(null)}
          >
            <div>
              <h3>{selectedHospital.name}</h3>
              <p>{selectedHospital.formatted_address}</p>
            </div>
          </InfoWindow>
        )} */}
        {/* <Position
          lat={addressP?.lat}
          lng={addressP?.lng}
          text={<HiLocationMarker color="black" size={"30px"} />}
        /> */}

        {/* <div className={cx("map-address")}>okok</div> */}
        {/* 
        <Position
          lat={10.817847838435899}
          lng={106.68003607706068}
          text={<MdOutlineAddLocation color="red" size={"30px"} />}
        />
        <Position
          lat={10.834859333915526}
          lng={106.66189322583296}
          text={<MdOutlineAddLocation color="red" size={"30px"} />}
        /> */}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
