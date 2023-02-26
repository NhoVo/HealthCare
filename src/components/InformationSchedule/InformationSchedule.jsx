import React from "react";
import classNames from "classnames/bind";
import styles from "./InformationSchedule.module.scss";
import moment from "moment";
const cx = classNames.bind(styles);

const InformatioSchedule = ({ user }) => {
  return (
    <div className={cx("header-title")}>
      <h1>Thông tin lịch hẹn</h1>
      <div className={cx("panel-body p-2")}>
        <form>
          <div className={cx("form-group py-1")}>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Họ và tên Bác sĩ:</b> {user.doctor?.fullName}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Ngày sinh:</b>
                  {moment(user.doctor?.dateOfBirth).format("DD/MM/YYYY")}
                </label>
              </div>
            </div>

            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Nơi công tác:</b> {user.doctor?.workPlace}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Chuyên khoa: </b> {user.doctor?.specialize}
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Họ và tên bệnh nhân:</b>
                  {user.patient?.fullName}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Số điện thoại:</b> {user.patient?.phone}
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Ngày Sinh:</b>{" "}
                  {moment(user.patient?.dateOfBirth).format("DD/MM/YYYY")}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Địa chỉ:</b> {user.patient?.address}
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field-2")}>
                <label>
                  <b>Ghi chú:</b>
                  {user?.notes}
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Ngày hẹn:</b>
                  {moment(user?.dateMeeting).format("DD/MM/YYYY")}
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Giờ hẹn:</b>
                  {user?.timeMeeting}
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InformatioSchedule;
