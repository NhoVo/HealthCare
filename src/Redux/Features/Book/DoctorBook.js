import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const DoctorBook = createSlice({
  name: "doctorBook",
  initialState: {
    listBookDoctor: [],
    acceptBookDoctor: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListBookedOfDoctor.fulfilled, (state, action) => {
      state.listBookDoctor = action.payload;
    });
    builder.addCase(fetchDoctorBookAccept.fulfilled, (state, action) => {
      state.acceptBookDoctor = action.payload;
    });
  },
});
//lấy danh sách lịch hẹn của bác sĩ
export const fetchListBookedOfDoctor = createAsyncThunk(
  // Tên action
  "doctorBook/fetchListBookedOfDoctor",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-appointment-doctor`,
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
    console.log(data);

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
    console.log(jsonData.data);
    return jsonData.data;
  }
);
export default DoctorBook;
