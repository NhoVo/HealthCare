import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postHealthRecord = createAsyncThunk(
  // Tên action
  "user/postHealthRecord",
  async (data) => {
    // Gọi lên API backend
    console.log(data);
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/health-record`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    // Convert dữ liệu ra json
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  }
);
export const healthRecordDay = createAsyncThunk(
  "user/healthRecordDay",
  async (arg, { rejectWithValue }) => {
    try {
      const getToken = JSON.parse(localStorage.getItem("user_login"));

      // check token
      if (getToken !== null) {
        return fetch(`${process.env.REACT_APP_BASE_URL}/health-record-day`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            return data.data;
          });
      }
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const HealthRecord = createSlice({
  name: "user",
  initialState: { data: "" },
  extraReducers: (builder) => {
    builder.addCase(postHealthRecord.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(healthRecordDay.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
export default HealthRecord;
