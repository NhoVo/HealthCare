import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./InformationDoctor.module.scss";
import images from "../../assets/images";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { userDoctorPatient, userLogin } from "../../Redux/selector";
import { fetchUserDoctor } from "../../Redux/Features/Users/UserDoctors";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import Button from "../../components/Button/Button";

import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
const cx = classNames.bind(styles);

const InformationDoctor = () => {
  const userD = useSelector(userDoctorPatient);
  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  //bac si
  const userDoctor = useSelector(userLogin);

  const [coordinates, setCoordinates] = useState(null);
  const [coordinatesP, setCoordinatesP] = useState(null);

  useEffect(() => {
    dispatch(fetchUserDoctor(user.doctorId));
  }, []);
  useEffect(() => {
    if (userDoctor.role === "DOCTOR") {
      const getCoords = async () => {
        // const addressArr = userD?.address?.split(",");
        const results = await geocodeByAddress(userDoctor.doctor?.address);
        const latlng = await getLatLng(results[0]);
        setCoordinates(latlng);
      };
      userDoctor && getCoords();
    } else {
      const getCoords = async () => {
        // const addressArr = userD?.address?.split(",");
        const results = await geocodeByAddress(userD?.address);
        const latlng = await getLatLng(results[0]);
        setCoordinates(latlng);
      };
      userD && getCoords();
      const getCoordsP = async () => {
        // const addressArr = userD?.address?.split(",");
        const resultsP = await geocodeByAddress(user?.address);
        const latlngP = await getLatLng(resultsP[0]);
        setCoordinatesP(latlngP);
      };
      userD && getCoordsP();
    }
  }, [userD, userDoctor]);

  return (
    <>
      {userDoctor.role === "DOCTOR" ? (
        <div className={cx("title")}>
          <h1>B??c S?? ??i???u Tr???</h1>
          <div className={cx("col-8")}>
            <div className={cx("Content")}>
              <div className={cx("Content-img")}>
                <img
                  className={cx("img")}
                  // src={phoneNumber.avatar}
                  src={images.doctor}
                  alt="avatar"
                />
                <div className={cx("updateDoctor")}>
                  <button>Thay ?????i</button>
                </div>
              </div>
              <div className={cx("panel-body p-2")}>
                <form>
                  <div className={cx("form-group py-1")}>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>H??? v?? t??n:</b>
                          {userDoctor.doctor?.fullName}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Ng??y sinh:</b>

                          {moment(userDoctor.doctor?.dateOfBirth).format(
                            "DD/MM/YYYY"
                          )}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>S??? ??i???n tho???i:</b>
                          {userDoctor.doctor?.phone}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Gi???i t??nh:</b>

                          {userDoctor.doctor?.gender === "MALE" ? "Nam" : "N???"}

                          {/* {moment(user?.dateOfBirth).format("DD/MM/YYYY")} */}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Email:</b>
                          {userDoctor.doctor?.email}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>N??i c??ng t??c:</b>
                          {userDoctor.doctor?.workPlace}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chuy??n m??n:</b>
                          {userDoctor.doctor?.specialize}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>S??? n??m kinh nghi???m:</b>
                          {userDoctor.doctor?.experience}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Tr??nh ?????: Ti???n s??</b>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>?????a ch???:</b>
                          {userDoctor.doctor?.address}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field-2")}>
                        <label>
                          <b>M?? t???:</b>
                          {userDoctor.doctor?.description}
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={cx("col-4")}>
              <GoogleMap coords={coordinates} />
            </div>
          </div>
        </div>
      ) : (
        <div className={cx("title")}>
          <h1>B??c S?? ??i???u Tr???</h1>
          <div className={cx("col-8")}>
            <div className={cx("Content")}>
              <div className={cx("Content-img")}>
                <img
                  className={cx("img")}
                  // src={phoneNumber.avatar}
                  src={images.doctor}
                  alt="avatar"
                />
                <div className={cx("updateDoctor")}>
                  <button>Thay ?????i</button>
                </div>
              </div>
              <div className={cx("panel-body p-2")}>
                <form>
                  <div className={cx("form-group py-1")}>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>H??? v?? t??n:</b>
                          {userD?.fullName}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Ng??y sinh:</b>

                          {moment(userD?.dateOfBirth).format("DD/MM/YYYY")}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>S??? ??i???n tho???i:</b>
                          {userD?.phone}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Gi???i t??nh:</b>

                          {userD?.gender === "MALE" ? "Nam" : "N???"}

                          {/* {moment(user?.dateOfBirth).format("DD/MM/YYYY")} */}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Email:</b>
                          {userD?.email}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>N??i c??ng t??c:</b>
                          {userD?.workPlace}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Chuy??n m??n:</b>
                          {userD?.specialize}
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>S??? n??m kinh nghi???m:</b>
                          {userD?.experience}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field")}>
                        <label>
                          <b>Tr??nh ?????: Ti???n s??</b>
                        </label>
                      </div>
                      <div className={cx("input-field")}>
                        <label>
                          <b>?????a ch???:</b>
                          {userD?.address}
                        </label>
                      </div>
                    </div>
                    <div className={cx("form-group-1")}>
                      <div className={cx("input-field-2")}>
                        <label>
                          <b>M?? t???:</b>
                          {userD?.description}
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={cx("col-4")}>
              <GoogleMap addressP={coordinatesP} coords={coordinates} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InformationDoctor;
