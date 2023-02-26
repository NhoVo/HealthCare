import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const Notifications = createSlice({
  name: "notifications",
  initialState: {
    allNotifications: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotficationsOfDoctor.fulfilled, (state, action) => {
      console.log(action.payload);
      state.allNotifications = action.payload;
    });
  },
});
// get tat ca thong bao cua bac si
export const fetchNotficationsOfDoctor = createAsyncThunk(
  // Tên action
  "userDoctors/fetchNotficationsOfDoctor",
  async (data) => {
    const param = new URLSearchParams({
      pageSize: 5,
      page: 1,
    });
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    console.log(123423);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-notifications?` + param.toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    // console.log(123423, response);
    // Convert dữ liệu ra json
    const jsonData = await response.json();
    console.log(jsonData.data);
    return jsonData.data;
  }
);
export default Notifications;
