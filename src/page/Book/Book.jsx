import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Book.module.scss";
import TextInput from "../../components/TextInput/TextInput";
import { Stack, TextField } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Button from "../../components/Button/Button";
import ModelWrapper from "../../components/ModelWrapper/ModelWrapper";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InformationSchedule from "../../components/InformationSchedule/InformationSchedule";
const cx = classNames.bind(styles);
const Book = () => {
  const [openInfo, setOpenInfo] = useState(false);
  const handleModelOpenInfo = () => {
    setOpenInfo(true);
  };
  const handleModelCloseInfo = () => {
    setOpenInfo(false);
  };
  return (
    <div className={cx("title")}>
      <h1>Đăng Ký Khám Bệnh</h1>

      <div className={cx("col-12")}>
        <div className={cx("col-6")}>
          <label>Thêm Thông Tin</label>
          <form>
            <div className={cx("form-group py-1")}>
              <div className={cx("form-group-1")}>
                <div className={cx("input-field")}>
                  <b>Họ và tên</b>
                  <TextInput
                    id="outlined-helperText"
                    placeholder="Họ và tên..."
                  />
                </div>
                <div className={cx("input-field")}>
                  <b>Ngày Sinh</b>
                  <Stack component="form" noValidate spacing={1}>
                    <TextField
                      id="date"
                      type="date"
                      defaultValue="2017-05-24"
                      sx={{ width: 380, marginTop: 1 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Stack>
                </div>
                <div className={cx("input-field")}>
                  <b>Số điện thoại</b>
                  <TextInput
                    id="outlined-helperText"
                    placeholder="Số điện thoại..."
                  />
                </div>
                <div className={cx("input-field")}>
                  <b>Ngày khám:</b>
                  <Stack component="form" noValidate spacing={1}>
                    <TextField
                      id="date"
                      type="date"
                      defaultValue="2017-05-24"
                      sx={{ width: 380, marginTop: 1 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Stack>
                </div>
                <div className={cx("input-field")}>
                  <b>Giờ khám:</b>8h-8h30
                </div>
                <div className={cx("input-field")}>
                  <b>Ghi chú</b>
                  <TextField
                    id="outlined-helperText"
                    placeholder="Nhập ghi chú..."
                    className={cx("intro")}
                    sx={{ width: 380 }}
                  />
                </div>
                <div className={cx("btn-register")}>
                  <Button>Đặt lịch</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className={cx("col-2")}>
          <label>Thời gian </label>
          <div className={cx("morning")}>
            <LightModeIcon sx={{ fontSize: 20 }} color="primary" />
            <h2>Buổi sáng</h2>
          </div>
          <div className={cx("time")}>
            <div className={cx("chooseTime")}>8h-8h30</div>
            <div className={cx("chooseTime")}>8h40-9h10</div>
            <div className={cx("chooseTime")}>9h20-9h50</div>
          </div>
          <div className={cx("time")}>
            <div className={cx("chooseTime")}>10h-10h30</div>
            <div className={cx("chooseTime")}>10h40-11h10</div>
            <div className={cx("chooseTime")}>11h20-11h50</div>
          </div>
          <div className={cx("afternoon")}>
            <Brightness4Icon sx={{ fontSize: 20 }} color="primary" />
            <h2>Buổi chiều</h2>
          </div>
          <div className={cx("time")}>
            <div className={cx("chooseTime")}>13h-13h30</div>
            <div className={cx("chooseTime")}>13h40-14h10</div>
            <div className={cx("chooseTime")}>14h20-14h50</div>
          </div>
          <div className={cx("time")}>
            <div className={cx("chooseTime")}>15h-15h30</div>
            <div className={cx("chooseTime")}>15h40-16h10</div>
            <div className={cx("chooseTime")}>16h20-16h50</div>
          </div>
        </div>

        <div className={cx("col-4")}>
          <label>Bảng Thông tin </label>
          <div className={cx("infor-book")}>
            <div className={cx("schedule")}>
              <div className={cx("title-schedule")}>Lịch hẹn 1</div>
              <div className={cx("doctorName-schedule")}>
                <b>Tên bác sĩ:</b> Lê Thị Liễu
              </div>
              <div className={cx("doctorName-schedule")}>
                <b>Thời gian: </b> 13h40-14h10
              </div>
              <div className={cx("doctorName-schedule")}>
                <b>ngày hẹn: </b> 15/02/2023
              </div>
              <div className={cx("button-schedule")}>
                <div className={cx("button-seen")}>
                  <button>Xem</button>
                </div>
                <div className={cx("button-cancel")}>
                  <button>Hủy</button>
                </div>
              </div>
            </div>
            <div className={cx("schedule")}>
              <div className={cx("title-schedule")}>Lịch hẹn 1</div>
              <div className={cx("doctorName-schedule")}>
                <b>Tên bác sĩ:</b> Lê Thị Liễu
              </div>
              <div className={cx("doctorName-schedule")}>
                <b>Thời gian: </b> 13h40-14h10
              </div>
              <div className={cx("doctorName-schedule")}>
                <b>ngày hẹn: </b> 15/02/2023
              </div>
              <div className={cx("button-schedule")}>
                <div className={cx("button-seen")}>
                  <button onClick={handleModelOpenInfo}>Xem</button>
                </div>
                <div className={cx("button-cancel")}>
                  <button>Hủy</button>
                </div>
              </div>
            </div>
            <div className={cx("schedule")}>
              <div className={cx("title-schedule")}>Lịch hẹn 1</div>
              <div className={cx("doctorName-schedule")}>
                <b>Tên bác sĩ:</b> Lê Thị Liễu
              </div>
              <div className={cx("doctorName-schedule")}>
                <b>Thời gian: </b> 13h40-14h10
              </div>
              <div className={cx("doctorName-schedule")}>
                <b>ngày hẹn: </b> 15/02/2023
              </div>
              <div className={cx("button-schedule")}>
                <div className={cx("button-seen")}>
                  <button>Xem</button>
                </div>
                <div className={cx("button-cancel")}>
                  <button>Hủy</button>
                </div>
              </div>
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
              <span className={cx("information-title")}></span>
              <button className={cx("close-btn")}>
                <FontAwesomeIcon
                  className={cx("close-ic")}
                  icon={faXmark}
                  onClick={handleModelCloseInfo}
                />
              </button>
            </div>
            <InformationSchedule />
          </div>
        </ModelWrapper>
      </div>
    </div>
  );
};

export default Book;
