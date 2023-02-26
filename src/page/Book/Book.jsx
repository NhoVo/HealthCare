import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getListBookDoctor,
  getListBookDoctorAccept,
  listBookPatient,
  patientBookeDetail,
  patientBookedSchedule,
  userDoctorPatient,
  userLogin,
  userPatients,
} from "../../Redux/selector";
import { fetchUserDoctor } from "../../Redux/Features/Users/UserDoctors";
import moment from "moment";
import { useForm } from "react-hook-form";
import {
  fetchBookDetail,
  fetchPatientBook,
  fetchPatientBookCancel,
} from "../../Redux/Features/Book/PatientBook";
import { toast } from "react-toastify";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { color } from "@mui/system";
import { fetchDoctorBookAccept } from "../../Redux/Features/Book/DoctorBook";
const cx = classNames.bind(styles);
const Book = () => {
  const user = useSelector(userLogin);
  const userDoctor = useSelector(userLogin);

  const { handleSubmit } = useForm();
  const dispatch = useDispatch();

  const userDoctorP = useSelector(userDoctorPatient);
  const [openInfo, setOpenInfo] = useState(false);
  const [name, setName] = useState(user?.fullName);
  const [phone, setPhone] = useState(user?.phone);
  const [dateOfBirth, setDateOfBirth] = useState(
    moment(user.dateOfBirth).format("YYYY-MM-DD")
  );
  const [dateMeeting, setDateMeeting] = useState("");
  const [note, setNote] = useState("");
  const [timeMeeting, setTimeMeeting] = useState("");
  const inforBook = useSelector(listBookPatient);
  const [count, setCount] = useState(inforBook?.length);
  const bookDetail = useSelector(patientBookeDetail);
  const tam = useSelector(patientBookedSchedule);
  const listAPatient = tam?.filter(
    (_pb) => _pb.statusAppointment === "APPROVED"
  );
  ///bác sĩ
  // const userPatient = useSelector(userPatients);
  const listBDoctor = useSelector(getListBookDoctor);
  const listADoctor = useSelector(getListBookDoctorAccept);
  console.log(listADoctor);
  const handleModelCloseInfo = () => {
    setOpenInfo(false);
  };
  //đặt lịch hẹn
  const handleBook = () => {
    if (count > 3) {
      console.log(count);
      alert("Bạn chỉ được đặt tối đa 3 cuộc hẹn");
    } else {
      setCount(inforBook.length);
      const data = {
        fullName: name,
        phone: phone,
        dateOfBirth: dateOfBirth,
        dateMeeting: dateMeeting,
        notes: note,
        timeMeeting: timeMeeting,
      };
      // console.log(data);
      dispatch(fetchPatientBook(data));
    }
  };

  const handleSeendetail = (b) => {
    dispatch(fetchBookDetail(b.id));

    setOpenInfo(true);
  };
  const handleCanceletail = (b) => {
    const choice = window.confirm(
      "Bạn có chắc chắn muốn hủy bỏ lịch hẹn không?"
    );
    if (choice === true) {
      dispatch(fetchPatientBookCancel(b.id));
      toast.success("Bạn đã xóa thành công lịch hẹn");
    } else {
      toast.error("Bạn đã đã hủy yêu cầu xóa lịch hẹn");
      return;
    }
  };

  //bác sĩ
  const handleAccept = (e) => {
    dispatch(fetchDoctorBookAccept(e.id));
  };
  return (
    <>
      {userDoctor.role === "DOCTOR" ? (
        <div className={cx("title")}>
          <h1>DANH SÁCH LỊCH HẸN</h1>
          <div className={cx("col-12")}>
            {/* <div className={cx("col-6")}>
              <label>Thêm Thông Tin</label>
              <form>
                <div className={cx("form-group py-1")}>
                  <div className={cx("form-group-1")}>
                    <div className={cx("input-field")}>
                      <b>Họ và tên</b>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          // value={age}
                          // onChange={handleChange}
                          className={cx("nameSelect")}
                        >
                          {userPatient.map((u) => {
                            return (
                              <MenuItem key={u.id} value={u.fullName}>
                                <em>{u.fullName}</em>
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className={cx("input-field")}>
                      <b>Ngày Sinh</b>
                      <Stack component="form" noValidate spacing={1}>
                        <TextField
                          id="date"
                          type="date"
                          sx={{ width: 380, marginTop: 1 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                      </Stack>
                    </div>
                    <div className={cx("input-field")}>
                      <b>Số điện thoại</b>
                      <TextInput
                        id="outlined-helperText"
                        placeholder="Số điện thoại..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <b>Ngày khám:</b>
                      <Stack component="form" noValidate spacing={1}>
                        <TextField
                          id="date"
                          type="date"
                          sx={{ width: 380, marginTop: 1 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={dateMeeting}
                          onChange={(e) => setDateMeeting(e.target.value)}
                        />
                      </Stack>
                    </div>
                    <div className={cx("input-field")}>
                      <b>Giờ khám:</b>
                      {timeMeeting}
                    </div>
                    <div className={cx("input-field")}>
                      <b>Ghi chú</b>
                      <TextField
                        id="outlined-helperText"
                        placeholder="Nhập ghi chú..."
                        className={cx("intro")}
                        sx={{ width: 380 }}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                    <div
                      className={cx("btn-register")}
                      onClick={handleSubmit(handleBook)}
                    >
                      <Button>Hẹn Khám</Button>
                    </div>
                  </div>
                </div>
              </form>
            </div> */}
            {/* <div className={cx("col-2")}>
              <label>Thời gian </label>
              <div className={cx("morning")}>
                <LightModeIcon sx={{ fontSize: 20 }} color="primary" />
                <h2>Buổi sáng</h2>
              </div>
              <div className={cx("time")}>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("8h - 8h30")}
                >
                  8h - 8h30
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("8h40 - 9h10")}
                >
                  8h40 - 9h10
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("9h20 - 9h50")}
                >
                  9h20 - 9h50
                </div>
              </div>
              <div className={cx("time")}>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("10h - 10h30")}
                >
                  10h - 10h30
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("10h40 - 11h10")}
                >
                  10h40 - 11h10
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("11h20 - 11h50")}
                >
                  11h20 - 11h50
                </div>
              </div>
              <div className={cx("afternoon")}>
                <Brightness4Icon sx={{ fontSize: 20 }} color="primary" />
                <h2>Buổi chiều</h2>
              </div>
              <div className={cx("time")}>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("13h - 13h30")}
                >
                  13h - 13h30
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("13h40 - 14h10")}
                >
                  13h40 - 14h10
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("14h20 - 14h50")}
                >
                  14h20 - 14h50
                </div>
              </div>
              <div className={cx("time")}>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("15h - 15h30")}
                >
                  15h - 15h30
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("15h40 - 16h10")}
                >
                  15h40 - 16h10
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("16h20 - 16h50")}
                >
                  16h20 - 16h50
                </div>
              </div>
            </div> */}
            <div className={cx("col-4-doctor")}>
              <label>Danh Sách Lịch Hẹn Chờ </label>
              <div className={cx("infor-book")}>
                <div className={cx("table-infor")}>
                  <table className={cx("table table-striped")}>
                    <thead>
                      <tr>
                        <th style={{ width: 30 }}>STT</th>
                        <th>Tên bệnh nhân</th>
                        <th>Thời gian hẹn</th>
                        <th>Ngày hẹn</th>
                        <th>Chi tiết</th>
                        <th>Chấp nhận</th>
                        <th>Từ trối</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listBDoctor.map((b, index) => {
                        return (
                          <tr key={b.id}>
                            <td style={{ width: 30 }}>{index + 1}</td>
                            <td>{b.fullName}</td>
                            <td>
                              {moment(b?.dateMeeting).format("DD/MM/YYYY")}
                            </td>
                            <td>{b.timeMeeting}</td>
                            <td>
                              <button onClick={() => handleSeendetail(b)}>
                                xem
                              </button>
                            </td>
                            <td>
                              <button onClick={() => handleAccept(b)}>
                                Chấp nhận
                              </button>
                            </td>
                            <td>
                              <button>Từ trối</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={cx("col-3-doctor")}>
                <label>Bảng Thông Tin Lịch Hẹn</label>
                <div className={cx("infor-book")}>
                  <div className={cx("table-infor")}>
                    <table className={cx("table table-striped")}>
                      <thead>
                        <tr>
                          <th style={{ width: 30 }}>STT</th>
                          <th>Tên bệnh nhân</th>
                          <th>Thời gian hẹn</th>
                          <th>Ngày hẹn</th>
                          <th>Chi tiết</th>
                          <th>Hủy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listADoctor.map((b, index) => {
                          return (
                            <tr key={b.id}>
                              <td style={{ width: 30 }}>{index + 1}</td>
                              <td>{b.fullName}</td>
                              <td>
                                {moment(b?.dateMeeting).format("DD/MM/YYYY")}
                              </td>
                              <td>{b.timeMeeting}</td>
                              <td>
                                <button onClick={() => handleSeendetail(b)}>
                                  xem
                                </button>
                              </td>
                              <td>
                                <button>Hủy</button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <b>Ngày Sinh</b>
                      <Stack component="form" noValidate spacing={1}>
                        <TextField
                          id="date"
                          type="date"
                          sx={{ width: 380, marginTop: 1 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                      </Stack>
                    </div>
                    <div className={cx("input-field")}>
                      <b>Số điện thoại</b>
                      <TextInput
                        id="outlined-helperText"
                        placeholder="Số điện thoại..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className={cx("input-field")}>
                      <b>Ngày khám:</b>
                      <Stack component="form" noValidate spacing={1}>
                        <TextField
                          id="date"
                          type="date"
                          sx={{ width: 380, marginTop: 1 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={dateMeeting}
                          onChange={(e) => setDateMeeting(e.target.value)}
                        />
                      </Stack>
                    </div>
                    <div className={cx("input-field")}>
                      <b>Giờ khám:</b>
                      {timeMeeting}
                    </div>
                    <div className={cx("input-field")}>
                      <b>Ghi chú</b>
                      <TextField
                        id="outlined-helperText"
                        placeholder="Nhập ghi chú..."
                        className={cx("intro")}
                        sx={{ width: 380 }}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                    <div
                      className={cx("btn-register")}
                      onClick={handleSubmit(handleBook)}
                    >
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
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("8h - 8h30")}
                >
                  8h - 8h30
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("8h40 - 9h10")}
                >
                  8h40 - 9h10
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("9h20 - 9h50")}
                >
                  9h20 - 9h50
                </div>
              </div>
              <div className={cx("time")}>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("10h - 10h30")}
                >
                  10h - 10h30
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("10h40 - 11h10")}
                >
                  10h40 - 11h10
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("11h20 - 11h50")}
                >
                  11h20 - 11h50
                </div>
              </div>
              <div className={cx("afternoon")}>
                <Brightness4Icon sx={{ fontSize: 20 }} color="primary" />
                <h2>Buổi chiều</h2>
              </div>
              <div className={cx("time")}>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("13h - 13h30")}
                >
                  13h - 13h30
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("13h40 - 14h10")}
                >
                  13h40 - 14h10
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("14h20 - 14h50")}
                >
                  14h20 - 14h50
                </div>
              </div>
              <div className={cx("time")}>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("15h - 15h30")}
                >
                  15h - 15h30
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("15h40 - 16h10")}
                >
                  15h40 - 16h10
                </div>
                <div
                  className={cx("chooseTime")}
                  onClick={() => setTimeMeeting("16h20 - 16h50")}
                >
                  16h20 - 16h50
                </div>
              </div>
            </div>

            <div className={cx("col-4")}>
              <label>Danh Sách Lịch Hẹn Chờ </label>
              <div className={cx("infor-book")}>
                {inforBook.map((b) => {
                  return (
                    <div className={cx("schedule")} key={b?.id}>
                      <div className={cx("title-schedule")}>Lịch hẹn</div>
                      <div className={cx("doctorName-schedule")}>
                        <b>Tên bác sĩ:</b> {b.doctor.fullName}
                      </div>
                      <div className={cx("doctorName-schedule")}>
                        <b>Thời gian: </b> {b.timeMeeting}
                      </div>
                      <div className={cx("doctorName-schedule")}>
                        <b>ngày hẹn: </b>{" "}
                        {moment(b.dateMeeting).format("DD/MM/YYYY")}
                      </div>
                      <div className={cx("button-schedule")}>
                        <div className={cx("button-seen")}>
                          <button onClick={() => handleSeendetail(b)}>
                            Xem
                          </button>
                        </div>
                        <div className={cx("button-cancel")}>
                          <button onClick={() => handleCanceletail(b)}>
                            Hủy
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={cx("col-3")}>
                <label>Bảng Thông Tin Lịch Hẹn</label>
                <div className={cx("infor-book")}>
                  {listAPatient.map((b) => {
                    return (
                      <div className={cx("schedule")} key={b?.id}>
                        <div className={cx("title-schedule")}>Lịch hẹn</div>
                        <div className={cx("doctorName-schedule")}>
                          <b>Tên bác sĩ:</b> {b.doctor.fullName}
                        </div>
                        <div className={cx("doctorName-schedule")}>
                          <b>Thời gian: </b> {b.timeMeeting}
                        </div>
                        <div className={cx("doctorName-schedule")}>
                          <b>ngày hẹn: </b>{" "}
                          {moment(b.dateMeeting).format("DD/MM/YYYY")}
                        </div>
                        <div className={cx("button-schedule")}>
                          <div className={cx("button-seen")}>
                            <button onClick={() => handleSeendetail(b)}>
                              Xem
                            </button>
                          </div>
                          <div className={cx("button-cancel")}>
                            <button onClick={() => handleCanceletail(b)}>
                              Hủy
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
          <InformationSchedule user={bookDetail} />
        </div>
      </ModelWrapper>
    </>
  );
};

export default Book;
