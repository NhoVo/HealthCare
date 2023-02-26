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
              console.log(data.data.role);
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
