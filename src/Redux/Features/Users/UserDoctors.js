import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const UserDoctors = createSlice({
  name: "listUserDoctors",
  initialState: { data: [], userDoctor: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDoctors.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchUserDoctor.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userDoctor = action.payload;
    });
  },
});
//lấy hết danh sách bác sĩ
export const fetchUserDoctors = createAsyncThunk(
  // Tên action
  "userDoctors/fetchUserDoctors",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/doctors`, {
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
// lấy thông tin bác sĩ theo id
export const fetchUserDoctor = createAsyncThunk(
  // Tên action
  "userDoctors/fetchUserDoctor",
  async (data) => {
    // Gọi lên API backend/v1/doctor/{id}

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/doctor/${data}`,
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
export default UserDoctors;
