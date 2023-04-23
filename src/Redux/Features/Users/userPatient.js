import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userPatient = createSlice({
  name: "listUserPatient",
  initialState: { userPatients: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPatients.fulfilled, (state, action) => {
      state.userPatients = action.payload;
    });
  },
});
//danh sách  bệnh nhân
export const fetchUserPatients = createAsyncThunk(
  // Tên action
  "userPatients/fetchUserPatients",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/patients`, {
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
//đổi mật khẩu
export const pathchangePassWord = createAsyncThunk(
  // Tên action
  "userPatients/pathchangePassWord",
  async (data) => {
    // Gọi lên API backend//v1/user/change-password

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/change-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    // Convert dữ liệu ra json/v1/notification/read-all
    const jsonData = await response.json();

    return jsonData;
  }
);

export default userPatient;
