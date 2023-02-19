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
                  <b>Họ và tên Bác sĩ:</b> Lê thị Liễu
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Ngày sinh:</b> 12/02/20023
                  {/* {moment(user?.dateOfBirth).format("DD/MM/YYYY")} */}
                </label>
              </div>
            </div>

            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Nơi công tác:</b> Bệnh viện 175
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Chuyên khoa: </b> Tim mạch
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Họ và tên bệnh nhân:</b>Võ Minh Phương
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Số điện thoại:</b> 0123456789
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Ngày Sinh:</b> 12/08/2023
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Địa chỉ:</b> Quận 12
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field-2")}>
                <label>
                  <b>Ghi chú:</b>
                  {user?.medicalHistory}
                </label>
              </div>
            </div>
            <div className={cx("form-group-1")}>
              <div className={cx("input-field")}>
                <label>
                  <b>Ngày hẹn:</b> 12/02/2023
                </label>
              </div>
              <div className={cx("input-field")}>
                <label>
                  <b>Giờ hẹn:</b> 8h-8h30
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
