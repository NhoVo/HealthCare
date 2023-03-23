import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//gửi thông tin báo cáo hằng ngày
export const postHealthRecord = createAsyncThunk(
  // Tên action
  "user/postHealthRecord",
  async (data) => {
    // Gọi lên API backend

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/health-record`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    // Convert dữ liệu ra json
    const jsonData = await response.json();

    return jsonData;
  }
);
//xem thông tin hằng ngày
export const healthRecordDay = createAsyncThunk(
  "user/healthRecordDay",
  async (arg, { rejectWithValue }) => {
    try {
      const getToken = JSON.parse(localStorage.getItem("user_login"));

      // check token
      if (getToken !== null) {
        return fetch(`${process.env.REACT_APP_BASE_URL}/health-record-day`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            return data.data;
          });
      }
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
// lấy hết chỉ số bệnh của bệnh nhân
export const fetchAllHealthRecord = createAsyncThunk(
  // Tên action
  "userDoctors/fetchAllHealthRecord",
  async (data) => {
    // Gọi lên API backend/v1/doctor/{id}
    const param = new URLSearchParams({
      isAll: true,
    });
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/health-record-member?` +
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
//bac si xem tinh hinh benh nhan theo id
export const fetchAllHRPatient = createAsyncThunk(
  // Tên action
  "userDoctors/fetchAllHRPatient",
  async (data) => {
    // Gọi lên API backend/v1/doctor/{id}health-record-patient/v1/doctor/health-record-patient

    const param = new URLSearchParams({
      patientId: data,
    });

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/doctor/health-record-patient?` +
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
//cap cuu
export const fetchEmergency = createAsyncThunk(
  // Tên action
  "userDoctors/fetchEmergency",
  async (data) => {
    // Gọi lên API backend/v1/doctor//v1/emergency

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/emergency`,
      {
        method: "POST",
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
const HealthRecord = createSlice({
  name: "user",
  initialState: { data: "", allHrecord: [], allHRPatient: [] },
  extraReducers: (builder) => {
    builder.addCase(postHealthRecord.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(healthRecordDay.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchAllHealthRecord.fulfilled, (state, action) => {
      state.allHrecord = action.payload;
    });
    builder.addCase(fetchAllHRPatient.fulfilled, (state, action) => {
      state.allHRPatient = action.payload;
    });
  },
});
export default HealthRecord;
