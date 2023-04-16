import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const DoctorBook = createSlice({
  name: "doctorBook",
  initialState: {
    listBookDoctor: [],
    acceptBookDoctor: [],
    listCreateDoctor: [],
    bookTime: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListBookedOfDoctor.fulfilled, (state, action) => {
      state.listBookDoctor = action.payload;
    });
    builder.addCase(fetchDoctorBookAccept.fulfilled, (state, action) => {
      state.acceptBookDoctor = action.payload;
    });
    builder.addCase(
      fetchListBookedOfDoctorCreate.fulfilled,
      (state, action) => {
        state.listCreateDoctor = action.payload;
      }
    );
    builder.addCase(fetchListBookTimeDoctor.fulfilled, (state, action) => {
      state.bookTime = action.payload;
    });
  },
});
//lấy danh sách lịch hẹn của bác sĩ chấp nhận của bác sĩ
export const fetchListBookedOfDoctor = createAsyncThunk(
  // Tên action
  "doctorBook/fetchListBookedOfDoctor",
  async (data) => {
    // Gọi lên API backend
    const param = new URLSearchParams({
      isAll: true,
      page: 1,
      pageSize: 10,
      status: "APPROVED",
    });
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-appointment-doctor?` +
        param.toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    // Convert dữ liệu ra json
    const jsonData = await response.json();

    return jsonData.data;
  }
);

//lấy danh sách lịch hẹn của bác sĩ chờ bác sĩ chấp nhận
export const fetchListBookedOfDoctorCreate = createAsyncThunk(
  // Tên action
  "doctorBook/fetchListBookedOfDoctorCreate",
  async (data) => {
    // Gọi lên API backend
    const param = new URLSearchParams({
      isAll: true,
      page: 1,
      pageSize: 10,
      status: "CREATED",
    });
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-appointment-doctor?` +
        param.toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    // Convert dữ liệu ra json
    const jsonData = await response.json();

    return jsonData.data;
  }
);
//chấp nhận lịch hẹn
export const fetchDoctorBookAccept = createAsyncThunk(
  // Tên action
  "userPatient/fetchDoctorBookAccept",
  async (data) => {
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/appointment/${data}/approve`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    // Convert dữ liệu ra json
    const jsonData = await response.json();
    return jsonData.data;
  }
);
export const fetchDoctorBookComplete = createAsyncThunk(
  // Tên action/v1/appointment/{id}/complete
  "userPatient/fetchDoctorBookComplete",
  async (data) => {
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/appointment/${data}/complete`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    // Convert dữ liệu ra json
    const jsonData = await response.json();
    return jsonData.data;
  }
);
export const fetchDoctorBookReFuse = createAsyncThunk(
  // Tên action/v1/appointment/{id}/complete/v1/appointment/{id}/refuse
  "userPatient/fetchDoctorBookReFuse",
  async (data) => {
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/appointment/${data}/refuse`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    // Convert dữ liệu ra json
    const jsonData = await response.json();
    return jsonData.data;
  }
);

export const fetchListBookTimeDoctor = createAsyncThunk(
  // Tên action
  "doctorBook/fetchListBookTimeDoctor",
  async (data) => {
    // Gọi lên API backend/v1/appointment-time
    console.log("data", data);
    const param = new URLSearchParams({
      doctorId: data.doctorId,
      timeDate: data.timeDate,
    });
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/appointment-time?` + param.toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    // Convert dữ liệu ra json
    const jsonData = await response.json();
    console.log(jsonData.data);
    return jsonData.data;
  }
);

export default DoctorBook;
