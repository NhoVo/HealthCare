import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//bác sĩ xem chỉ số của bệnh nhân
const HeartbeatPatient = createSlice({
  name: "listHPatient",
  initialState: {
    dataDoctor: [],
    bmiDoctor: [],
    bloodPressuresDoctor: [],
    cholesterolDoctor: [],
    glucosesDoctor: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHeartbeatsDoctor.fulfilled, (state, action) => {
      state.dataDoctor = action.payload;
    });
    builder.addCase(fetchBMIDoctor.fulfilled, (state, action) => {
      state.bmiDoctor = action.payload;
    });
    builder.addCase(fetchBloodPressuresDoctor.fulfilled, (state, action) => {
      state.bloodPressuresDoctor = action.payload;
    });
    builder.addCase(fetchCholesterolDoctor.fulfilled, (state, action) => {
      state.cholesterolDoctor = action.payload;
    });
    builder.addCase(fetchGlucosesDoctor.fulfilled, (state, action) => {
      state.glucosesDoctor = action.payload;
    });
  },
});
//xem nhịp tim
export const fetchHeartbeatsDoctor = createAsyncThunk(
  // Tên action
  "userDoctors/fetchHeartbeatsDoctor",
  async (data) => {
    // Gọi lên API backend
    const param = new URLSearchParams({
      patientId: data,
      pageSize: 5,
      page: 1,
    });
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-heartbeat-doctor?` +
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
//xem BMI
export const fetchBMIDoctor = createAsyncThunk(
  // Tên action
  "userDoctors/fetchBMIDoctor",
  async (data) => {
    const param = new URLSearchParams({
      patientId: data,
      pageSize: 5,
      page: 1,
    });
    // Gọi lên API backend/v1/get-bmi-doctor
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-bmi-doctor?` + param.toString(),
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
//xem huyết áp
export const fetchBloodPressuresDoctor = createAsyncThunk(
  // Tên action
  "userDoctors/fetchBloodPressuresDoctor",
  async (data) => {
    // Gọi lên API backend
    const param = new URLSearchParams({
      patientId: data,

      pageSize: 5,
      page: 1,
    });
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-blood-pressure-doctor?` +
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
// xem Cholesterol
export const fetchCholesterolDoctor = createAsyncThunk(
  // Tên action
  "userDoctors/fetchCholesterolDoctor",
  async (data) => {
    // Gọi lên API backend
    const param = new URLSearchParams({
      patientId: data,
      pageSize: 5,
      page: 1,
    });
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-cholesterol-doctor?` +
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
//xem Glucoses
export const fetchGlucosesDoctor = createAsyncThunk(
  // Tên action
  "userDoctors/fetchGlucosesDoctor",
  async (data) => {
    // Gọi lên API backend
    const param = new URLSearchParams({
      patientId: data,

      pageSize: 5,
      page: 1,
    });
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-glucose-doctor?` +
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
export default HeartbeatPatient;
