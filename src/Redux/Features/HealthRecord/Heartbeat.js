import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const Heartbeat = createSlice({
  name: "listHeartbeat",
  initialState: { data: [], bmi: [], bloodPressures: [] },
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
  },
});

export const fetchHeartbeats = createAsyncThunk(
  // Tên action
  "userDoctors/fetchHeartbeats",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/heartbeats`,
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

export const fetchBMI = createAsyncThunk(
  // Tên action
  "userDoctors/fetchBMI",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/bmis`, {
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
export const fetchBloodPressures = createAsyncThunk(
  // Tên action
  "userDoctors/fetchBloodPressures",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/blood-pressures`,
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
