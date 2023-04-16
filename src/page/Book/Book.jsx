import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Stack, TextField } from "@mui/material";
import classNames from "classnames/bind";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Button/Button";
import InformationSchedule from "../../components/InformationSchedule/InformationSchedule";
import ModelWrapper from "../../components/ModelWrapper/ModelWrapper";
import TextInput from "../../components/TextInput/TextInput";
import {
  fetchDoctorBookAccept,
  fetchDoctorBookComplete,
  fetchDoctorBookReFuse,
  fetchListBookTimeDoctor,
  fetchListBookedOfDoctor,
  fetchListBookedOfDoctorCreate,
} from "../../Redux/Features/Book/DoctorBook";
import {
  fetchBookDetail,
  fetchBookedSchedule,
  fetchBookedScheduleCreate,
  fetchPatientBook,
  fetchPatientBookCancel,
} from "../../Redux/Features/Book/PatientBook";
import { postNotification } from "../../Redux/Features/Notifications/Notifications";
import {
  getListBookDoctorAccept,
  listBookDoctorCreate,
  listBookTimesDoctor,
  patientBookCreate,
  patientBookeDetail,
  patientBookedSchedule,
  sumBookPatient,
  sumIndexBook,
  userDoctorPatient,
  userLogin,
} from "../../Redux/selector";
import styles from "./Book.module.scss";
import DiseaseIndex from "../../components/DiseaseIndex/DiseaseIndex";
const cx = classNames.bind(styles);
const Book = () => {
  const user = useSelector(userLogin);
  const userDoctor = useSelector(userLogin);
  const [loadingBook, setLoadingBook] = useState(false);
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [openInfo, setOpenInfo] = useState(false);

  const [name, setName] = useState(user?.fullName);
  const [phone, setPhone] = useState(user?.phone);
  const [dateOfBirth, setDateOfBirth] = useState(
    moment(user.dateOfBirth).format("YYYY-MM-DD")
  );
  const navigate = useNavigate();
  const [dateMeeting, setDateMeeting] = useState("");
  const [note, setNote] = useState("");
  const [timeMeeting, setTimeMeeting] = useState("");
  const inforBook = useSelector(patientBookCreate);
  const listAPatient = useSelector(patientBookedSchedule);
  const sum = useSelector(sumBookPatient);
  const bookDetail = useSelector(patientBookeDetail);
  ///bác sĩ
  // const userPatient = useSelector(userPatients);
  const listBDoctor = useSelector(listBookDoctorCreate);
  const listADoctor = useSelector(getListBookDoctorAccept);
  const listTimesBook = useSelector(listBookTimesDoctor);

  const sumIndexB = useSelector(sumIndexBook);
  const currentDate = new Date();
  /// phan trang danh sach cho
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(6);
  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(listBDoctor.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listBDoctor.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={cx(currentPage === number ? "active" : null)}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    if (currentPage !== pages[pages.length - 1]) {
      setcurrentPage(currentPage + 1);

      if (currentPage + 1 > maxPageNumberLimit) {
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  const handlePrevbtn = () => {
    if (currentPage !== pages[0]) {
      setcurrentPage(currentPage - 1);

      if ((currentPage - 1) % pageNumberLimit == 0) {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }
  //phân trang cho danh sách chờ
  const [currentPageA, setcurrentPageA] = useState(1);
  const [itemsPerPageA, setitemsPerPageA] = useState(6);
  const [pageNumberLimitA, setpageNumberLimitA] = useState(3);
  const [maxPageNumberLimitA, setmaxPageNumberLimitA] = useState(3);
  const [minPageNumberLimitA, setminPageNumberLimitA] = useState(0);
  const handleClickA = (event) => {
    setcurrentPageA(Number(event.target.id));
  };

  const pagesA = [];
  for (let i = 1; i <= Math.ceil(listADoctor.length / itemsPerPageA); i++) {
    pagesA.push(i);
  }

  const indexOfLastItemA = currentPageA * itemsPerPageA;
  const indexOfFirstItemA = indexOfLastItemA - itemsPerPageA;
  const currentItemsA = listADoctor.slice(indexOfFirstItemA, indexOfLastItemA);

  const renderPageNumbersA = pagesA.map((number) => {
    if (number < maxPageNumberLimitA + 1 && number > minPageNumberLimitA) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClickA}
          className={cx(currentPageA === number ? "active" : null)}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtnA = () => {
    if (currentPageA !== pagesA[pagesA.length - 1]) {
      setcurrentPage(currentPageA + 1);

      if (currentPageA + 1 > maxPageNumberLimitA) {
        setmaxPageNumberLimit(maxPageNumberLimitA + pageNumberLimitA);
        setminPageNumberLimit(minPageNumberLimitA + pageNumberLimitA);
      }
    }
  };

  const handlePrevbtnA = () => {
    if (currentPageA !== pagesA[0]) {
      setcurrentPageA(currentPageA - 1);

      if ((currentPageA - 1) % pageNumberLimitA == 0) {
        setmaxPageNumberLimit(maxPageNumberLimitA - pageNumberLimitA);
        setminPageNumberLimit(minPageNumberLimitA - pageNumberLimitA);
      }
    }
  };

  let pageIncrementBtnA = null;
  if (pagesA.length > maxPageNumberLimitA) {
    pageIncrementBtnA = <li onClick={handleNextbtnA}> &hellip; </li>;
  }

  let pageDecrementBtnA = null;
  if (minPageNumberLimitA >= 1) {
    pageDecrementBtnA = <li onClick={handlePrevbtnA}> &hellip; </li>;
  }
  //lich hen realtime
  useEffect(() => {
    dispatch(fetchBookedSchedule());
    dispatch(fetchListBookedOfDoctor());
    dispatch(fetchListBookedOfDoctorCreate());
    dispatch(fetchBookedScheduleCreate());
    if (dateMeeting !== "") {
      const data = {
        doctorId: user?.doctorId,
        timeDate: dateMeeting,
      };
      dispatch(fetchListBookTimeDoctor(data));
    }
    setLoadingBook(false);
  }, [loadingBook === true]);

  useEffect(() => {
    if (dateMeeting !== "") {
      const data = {
        doctorId: user?.doctorId,
        timeDate: dateMeeting,
      };
      dispatch(fetchListBookTimeDoctor(data));
    }
  }, [dateMeeting]);
  const handleModelCloseInfo = () => {
    setOpenInfo(false);
  };
  //đặt lịch hẹn
  const handleBook = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    console.log(sum);
    if (sum > 2) {
      toast.error("Bạn chỉ được đặt tối đa 3 cuộc hẹn");
    } else if (dateMeeting < currentDate) {
      toast.error("ngày đặt lịch phải sau ngày hiện tại");
    } else {
      const data = {
        fullName: name,
        phone: phone,
        dateOfBirth: dateOfBirth,
        dateMeeting: dateMeeting,
        notes: note,
        timeMeeting: timeMeeting,
      };
      dispatch(fetchPatientBook(data));
      setDateMeeting("");
      setNote("");
      setTimeMeeting("");
      toast.success("Đặt lịch thành công");
      setLoadingBook(true);
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
      toast.success("Bạn đã hủy thành công lịch hẹn");
      setLoadingBook(true);
    } else {
      toast.error("Bạn đã đã hủy yêu cầu xóa lịch hẹn");
      return;
    }
  };

  //bác sĩ
  const handleAccept = (e) => {
    dispatch(fetchDoctorBookAccept(e.id));

    toast.success("Bạn đã chấp nhận lịch hẹn");

    setLoadingBook(true);
  };

  //tạo phòng
  const handleCreateRoom = (b) => {
    const data = {
      userId: b.patient.id,
      typeNotification: "SYSTEM",
      content: "Bác sĩ đã tạo phòng",
      title: "Lịch hẹn",
    };
    dispatch(postNotification(data));
    navigate(`/room/${123123}`, {
      state: {
        user,
      },
    });
  };
  const handleGoRoom = () => {
    //navigate("/HomeZoom");
    // if (checkCreateRoom === true) {
    navigate(`/room/${123123}`, {
      state: {
        user,
      },
    });
    //   dispatch(filterSlice.actions.clickChange(""));
    // } else {
    //   alert("Phòng chưa sẵn sàng? Vui lòng đợi bác sĩ mở phòng");
    // }
  };

  const handlereFuse = (b) => {
    const choice = window.confirm(
      "Bạn có chắc chắn muốn từ chối lịch hẹn không?"
    );
    if (choice === true) {
      dispatch(fetchDoctorBookReFuse(b.id));
      toast.success("Bạn đã từ chối thành công lịch hẹn");
      setLoadingBook(true);
    } else {
      toast.error("Bạn đã đã hủy yêu cầu từ chối lịch hẹn");
      return;
    }
  };
  const handleComplete = (b) => {
    const data = {
      userId: b.patient.id,
      typeNotification: "SYSTEM",
      content:
        "Lịch hẹn ngày &nbsp;" +
        moment(b?.dateMeeting).format("DD/MM/YYYY") +
        "đã hoàn thành",
      title: "Lịch hẹn",
    };
    dispatch(postNotification(data));
    dispatch(fetchDoctorBookComplete(b.id));
    toast.success("Bạn đã hoàn thành cuộc hẹn");
  };
  return (
    <>
      {userDoctor.role === "DOCTOR" ? (
        <div className={cx("title")}>
          <div className={cx("col-12-doctor")}>
            <div className={cx("index-book-doctor")}>
              <div className={cx("col-12")}>
                <div className={cx("col-2-doctor")}>
                  <div className={cx("form-d")}>
                    <div className={cx("name-d")}>Lịch hẹn</div>
                    <div className={cx("index-d")}>{sumIndexB}</div>
                  </div>
                </div>
                <div className={cx("col-2-doctor")}>
                  <div className={cx("form-d")}>
                    <div className={cx("name-d")}>Lịch hẹn Chờ</div>
                    <div className={cx("index-d")}>{listBDoctor.length}</div>
                  </div>
                </div>
                <div className={cx("col-2-doctor")}>
                  <div className={cx("form-d")}>
                    <div className={cx("name-d")}>Lịch hẹn chấp nhận</div>
                    <div className={cx("index-d")}>{listADoctor?.length}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("col-4-doctor")}>
              <div>
                <div className={cx("title-table")}>Danh sách lịch hẹn chờ</div>
                <div className={cx("table-infor")}>
                  <table className={cx("table")}>
                    <thead>
                      <tr>
                        <th>Ngày</th>
                        <th>Tên bệnh nhân</th>
                        <th>Thời gian</th>
                        <th>Chi tiết</th>
                        <th>Chấp nhận</th>
                        <th>Từ trối</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((b, index) => {
                        return (
                          <tr key={b.id}>
                            <td>
                              {moment(b?.dateMeeting).format("DD/MM/YYYY")}
                            </td>
                            <td>{b?.fullName}</td>
                            <td>{b?.timeMeeting}</td>
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
                              <button
                                style={{ backgroundcolor: "silver" }}
                                onClick={() => handlereFuse(b)}
                              >
                                Từ trối
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <ul className={cx("pageNumbers")}>
                  <li onClick={handlePrevbtn}>&lt;</li>
                  {pageDecrementBtn}
                  {renderPageNumbers}
                  {pageIncrementBtn}

                  <li onClick={handleNextbtn}>&gt;</li>
                </ul>
              </div>
              <div>
                <div className={cx("title-table")}>Bảng Thông Tin Lịch Hẹn</div>

                <div className={cx("table-infor")}>
                  <table className={cx("table")}>
                    <thead>
                      <tr>
                        <th>Ngày</th>
                        <th>Tên bệnh nhân</th>
                        <th>Thời gian</th>
                        <th>Chi tiết</th>
                        <th>Phòng</th>
                        <th>Trạng thái</th>
                        <th>Hủy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItemsA.map((b, index) => {
                        return (
                          <tr key={b.id}>
                            <td>
                              {moment(b?.dateMeeting).format("DD/MM/YYYY")}
                            </td>
                            <td>{b?.fullName}</td>
                            <td>{b?.timeMeeting}</td>
                            <td>
                              <button onClick={() => handleSeendetail(b)}>
                                xem
                              </button>
                            </td>
                            <td>
                              {moment(b?.dateMeeting).format("DD/MM/YYYY") ===
                              moment(currentDate).format("DD/MM/YYYY") ? (
                                <button onClick={() => handleCreateRoom(b)}>
                                  Tạo Phòng
                                </button>
                              ) : (
                                <td>Đang chờ</td>
                              )}
                            </td>
                            <td>
                              {moment(b?.dateMeeting).format("DD/MM/YYYY") ===
                              moment(currentDate).format("DD/MM/YYYY") ? (
                                <button onClick={() => handleComplete(b)}>
                                  Hoàn thành
                                </button>
                              ) : (
                                <td>Đang chờ</td>
                              )}
                            </td>
                            <td>
                              <button
                                onClick={() => handleCanceletail(b)}
                                style={{ backgroundcolor: "silver" }}
                              >
                                Hủy
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <ul className={cx("pageNumbers")}>
                  <li onClick={handlePrevbtn}>&lt;</li>
                  {pageDecrementBtnA}
                  {renderPageNumbersA}
                  {pageIncrementBtnA}

                  <li onClick={handleNextbtn}>&gt;</li>
                </ul>
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
              {/* <form> */}
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
              {/* </form> */}
            </div>
            <div className={cx("col-2")}>
              <label>Thời gian </label>
              <div className={cx("morning")}>
                <LightModeIcon sx={{ fontSize: 20 }} color="primary" />
                <h2>Buổi sáng</h2>
              </div>
              <div className={cx("time")}>
                {listTimesBook?.includes("8h - 8h30") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    8h - 8h30
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("8h - 8h30")}
                  >
                    8h - 8h30
                  </div>
                )}
                {listTimesBook?.includes("8h40 - 9h10") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    8h40 - 9h10
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("8h40 - 9h10")}
                  >
                    8h40 - 9h10
                  </div>
                )}
                {listTimesBook?.includes("9h20 - 9h50") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    9h20 - 9h50
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("9h20 - 9h50")}
                  >
                    9h20 - 9h50
                  </div>
                )}
              </div>
              <div className={cx("time")}>
                {listTimesBook?.includes("10h - 10h30") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    10h - 10h30
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("10h - 10h30")}
                  >
                    10h - 10h30
                  </div>
                )}
                {listTimesBook?.includes("10h40 - 11h10") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    10h40 - 11h10
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("10h40 - 11h10")}
                  >
                    10h40 - 11h10
                  </div>
                )}
                {listTimesBook?.includes("11h20 - 11h50") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    11h20 - 11h50
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("11h20 - 11h50")}
                  >
                    11h20 - 11h50
                  </div>
                )}
              </div>
              <div className={cx("afternoon")}>
                <Brightness4Icon sx={{ fontSize: 20 }} color="primary" />
                <h2>Buổi chiều</h2>
              </div>
              <div className={cx("time")}>
                {listTimesBook?.includes("13h - 13h30") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    13h - 13h30
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("13h - 13h30")}
                  >
                    13h - 13h30
                  </div>
                )}
                {listTimesBook?.includes("13h40 - 14h10") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    13h40 - 14h10
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("13h40 - 14h10")}
                  >
                    13h40 - 14h10
                  </div>
                )}
                {listTimesBook?.includes("14h20 - 14h50") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    14h20 - 14h50
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("14h20 - 14h50")}
                  >
                    14h20 - 14h50
                  </div>
                )}
              </div>
              <div className={cx("time")}>
                {listTimesBook?.includes("15h - 15h30") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    15h - 15h30
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("15h - 15h30")}
                  >
                    15h - 15h30
                  </div>
                )}
                {listTimesBook?.includes("15h40 - 16h10") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    15h40 - 16h10
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("15h40 - 16h10")}
                  >
                    15h40 - 16h10
                  </div>
                )}
                {listTimesBook?.includes("16h20 - 16h50") ? (
                  <div
                    className={cx("chooseTime")}
                    // onClick={() => setTimeMeeting("10h - 10h30")}
                    style={{
                      backgroundColor: "#33CCFF",
                      textDecoration: "line-through",
                    }}
                  >
                    16h20 - 16h50
                  </div>
                ) : (
                  <div
                    className={cx("chooseTime")}
                    onClick={() => setTimeMeeting("16h20 - 16h50")}
                  >
                    16h20 - 16h50
                  </div>
                )}
              </div>
            </div>

            <div className={cx("col-4")}>
              <div className={cx("col-3")}>
                <div className={cx("title-table")}>Danh Sách Lịch Hẹn Chờ</div>

                <div className={cx("infor-book")}>
                  {inforBook.map((b) => {
                    return (
                      <div className={cx("schedule")} key={b?.id}>
                        <div className={cx("title-schedule")}>Lịch hẹn</div>
                        <div className={cx("doctorName-schedule")}>
                          <b>Tên bác sĩ:</b> {b?.doctor?.fullName}
                        </div>
                        <div className={cx("doctorName-schedule")}>
                          <b>Thời gian: </b> {b?.timeMeeting}
                        </div>
                        <div className={cx("doctorName-schedule")}>
                          <b>ngày hẹn: </b>{" "}
                          {moment(b?.dateMeeting).format("DD/MM/YYYY")}
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
              <div className={cx("col-3-patient")}>
                <div className={cx("title-table")}>Bảng Thông Tin Lịch Hẹn</div>
                <div className={cx("infor-book")}>
                  {listAPatient.map((b) => {
                    return (
                      <div className={cx("schedule")} key={b?.id}>
                        <div className={cx("title-schedule")}>Lịch hẹn</div>
                        <div className={cx("doctorName-schedule")}>
                          <b>Tên bác sĩ:</b> {b?.doctor?.fullName}
                        </div>
                        <div className={cx("doctorName-schedule")}>
                          <b>Thời gian: </b> {b?.timeMeeting}
                        </div>
                        <div className={cx("doctorName-schedule")}>
                          <b>ngày hẹn: </b>
                          {moment(b?.dateMeeting).format("DD/MM/YYYY")}
                        </div>
                        <div className={cx("button-schedule")}>
                          <div className={cx("button-seen")}>
                            <button onClick={() => handleSeendetail(b)}>
                              Xem
                            </button>
                          </div>

                          {moment(b?.dateMeeting).format("DD/MM/YYYY") ===
                          moment(currentDate).format("DD/MM/YYYY") ? (
                            <div className={cx("button-seen")}>
                              <button onClick={handleGoRoom}>Vào phòng</button>
                            </div>
                          ) : (
                            <div className={cx("doctorName-schedule")}>
                              <b>Đang chờ </b>
                            </div>
                          )}
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
