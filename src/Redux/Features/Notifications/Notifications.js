import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const Notifications = createSlice({
  name: "notifications",
  initialState: {
    allNotifications: [],
    seen: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotficationsOfDoctor.fulfilled, (state, action) => {
      state.allNotifications = action.payload;
    });
    builder.addCase(seenNotifications.fulfilled, (state, action) => {
      state.seen = action.payload;
    });
  },
});
// get tat ca thong bao cua bac si
export const fetchNotficationsOfDoctor = createAsyncThunk(
  // Tên action
  "user/fetchNotficationsOfDoctor",
  async (data) => {
    // Gọi lên API backend
    const getToken = JSON.parse(localStorage.getItem("user_login"));

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get-notifications`,
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
// xem thông báo từng cái theo id
export const seenNotifications = createAsyncThunk(
  // Tên action
  "user/seenNotifications",
  async (data) => {
    // Gọi lên API backend/v1/notification/{id}/read  /v1/notification/{id}/read
    console.log(data);
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/notification/${data}/read`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );

    // Convert dữ liệu ra json/v1/notification/read-all
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  }
);
//xem tất cả
export const seenAllNotifications = createAsyncThunk(
  // Tên action
  "user/seenAllNotifications",
  async () => {
    // Gọi lên API backend/v1/notification/{id}/read  /v1/notification/{id}/read

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/notification/read-all`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );

    // Convert dữ liệu ra json/v1/notification/read-all
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  }
);
export default Notifications;
