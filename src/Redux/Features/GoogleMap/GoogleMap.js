import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllHospital = createAsyncThunk(
  "user/fetchAllHospital",
  async (data) => {
    // Gọi lên API backend/v1/doctor/{id}
    const param = new URLSearchParams({
      lat: data.lat,
      lng: data.lng,
    });
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/hospitals?` + param.toString(),
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
export const fetchSearchHospital = createAsyncThunk(
  "user/fetchSearchHospital",
  async (data) => {
    // Gọi lên API backend/v1/doctor/{id}

    const param = new URLSearchParams({
      resultSearch: data,
    });

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/resultSearch?` + param.toString(),
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
    console.log("data", jsonData.data);

    return jsonData.data;
  }
);
const GoogleMap = createSlice({
  name: "user",
  initialState: { data: [], dataSearch: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchAllHospital.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchSearchHospital.fulfilled, (state, action) => {
      state.dataSearch = action.payload;
    });
  },
});

export default GoogleMap;
