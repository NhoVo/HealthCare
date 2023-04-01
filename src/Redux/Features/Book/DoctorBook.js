import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const DoctorBook = createSlice({
  name: "doctorBook",
  initialState: {
    listBookDoctor: [],
    acceptBookDoctor: [],
    listCreateDoctor: [],
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
export default DoctorBook;
