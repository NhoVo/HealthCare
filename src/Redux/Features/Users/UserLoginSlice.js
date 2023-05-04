import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//lấy thông tin user login
export const fetchLoginSlice = createAsyncThunk(
  "user/fetchLoginSlice",
  async (arg, { rejectWithValue }) => {
    try {
      const getToken = JSON.parse(localStorage.getItem("user_login"));
      // check token
      if (getToken !== null) {
        return fetch(`${process.env.REACT_APP_BASE_URL}/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.data.role === "DOCTOR") {
              return data.data;
            } else {
              return data.data.patient;
            }
          });
      }
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
export const fetchUserCaller = createAsyncThunk(
  // Tên action /v1/user/me/{id}
  "user/fetchUserCaller",
  async (data) => {
    // Gọi lên API backend
    console.log(data, "------");
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/me/${data}`,
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
export const logoutUser = createAsyncThunk(
  // Tên action
  "user/logoutUser",
  async (data) => {
    // Gọi lên API backend//v1/auth/user/logout

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/user/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    // Convert dữ liệu ra json/v1/notification/read-all
    const jsonData = await response.json();
    console.log("okokok", jsonData);

    return jsonData.data;
  }
);
const UserLoginSlice = createSlice({
  name: "user",
  initialState: { data: "" },
  extraReducers: (builder) => {
    builder.addCase(fetchLoginSlice.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
export default UserLoginSlice;
