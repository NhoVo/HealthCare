import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const PatientBook = createSlice({
  name: "patientBook",
  initialState: {
    patientBook: [],
    bookedSchedule: [],
    bookDetail: [],
    cancelBook: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatientBook.fulfilled, (state, action) => {
      state.patientBook = action.payload;
    });
    builder.addCase(fetchBookedSchedule.fulfilled, (state, action) => {
      state.bookedSchedule = action.payload;
    });
    builder.addCase(fetchBookDetail.fulfilled, (state, action) => {
      console.log(action.payload);
      state.bookDetail = action.payload;
    });
    builder.addCase(fetchPatientBookCancel.fulfilled, (state, action) => {
      state.cancelBook = action.payload;
    });
  },
});
// đặt lịch hẹn
export const fetchPatientBook = createAsyncThunk(
  "patientBook/fetchPatientBook",
  async (data, { rejectWithValue }) => {
    try {
      const getToken = JSON.parse(localStorage.getItem("user_login"));
      console.log(data);
      // check token
      if (getToken !== null) {
        return fetch(`${process.env.REACT_APP_BASE_URL}/appointment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getToken}`,
          },
          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.statusCode !== 200) {
              throw new Error(data.message);
            } else {
              alert("đặt lịch thành công");
              console.log(data);
              return data;
            }
          });
      }
    } catch (err) {
      console.log(err);
      rejectWithValue(err);
    }
  }
);
// thông tin danh sách lịch hẹn của bệnh nhân
export const fetchBookedSchedule = createAsyncThunk(
  // Tên action
  "patientBook/fetchBookedSchedule",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-appointment-patient`,
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
// thông tin chi tiết lịch hẹn
export const fetchBookDetail = createAsyncThunk(
  // Tên action
  "userPatient/fetchBookDetail",
  async (data) => {
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/appointment/${data}`,
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
//hủy lịch hẹn từ bệnh nhân
export const fetchPatientBookCancel = createAsyncThunk(
  // Tên action
  "userPatient/fetchPatientBookCancel",
  async (data) => {
    console.log(data);

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/appointment/${data}/cancel`,
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
export default PatientBook;
