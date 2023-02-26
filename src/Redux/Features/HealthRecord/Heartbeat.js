import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const Heartbeat = createSlice({
  name: "listHeartbeat",
  initialState: {
    data: [],
    bmi: [],
    bloodPressures: [],
    cholesterol: [],
    glucoses: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHeartbeats.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchBMI.fulfilled, (state, action) => {
      state.bmi = action.payload;
    });
    builder.addCase(fetchBloodPressures.fulfilled, (state, action) => {
      state.bloodPressures = action.payload;
    });
    builder.addCase(fetchCholesterol.fulfilled, (state, action) => {
      state.cholesterol = action.payload;
    });
    builder.addCase(fetchGlucoses.fulfilled, (state, action) => {
      state.glucoses = action.payload;
    });
  },
});
//xem nhịp tim
export const fetchHeartbeats = createAsyncThunk(
  // Tên action
  "userDoctors/fetchHeartbeats",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-heartbeat`,
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
//xem BMI
export const fetchBMI = createAsyncThunk(
  // Tên action
  "userDoctors/fetchBMI",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/get-bmi`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
      },
    });
    // Convert dữ liệu ra json
    const jsonData = await response.json();
    return jsonData.data;
  }
);
//xem huyết áp
export const fetchBloodPressures = createAsyncThunk(
  // Tên action
  "userDoctors/fetchBloodPressures",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-blood-pressure`,
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
export const fetchCholesterol = createAsyncThunk(
  // Tên action
  "userDoctors/fetchCholesterol",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-cholesterol`,
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
export const fetchGlucoses = createAsyncThunk(
  // Tên action
  "userDoctors/fetchGlucoses",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-glucose`,
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
export default Heartbeat;
