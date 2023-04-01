import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const RatingDoctor = createSlice({
  name: "ratingDoctor",
  initialState: { ratingData: [] },
  extraReducers: (builder) => {
    builder.addCase(getRatingOfDoctor.fulfilled, (state, action) => {
      state.ratingData = action.payload;
    });
  },
});
//post rating của bệnh nhân
export const postRatingOfDoctor = createAsyncThunk(
  // Tên action
  "doctor/postRatingOfDoctor",
  async (data) => {
    // Gọi lên API backend//v1/patient/rating

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/patient/rating`,
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

    return jsonData;
  }
);
// lấy đánh giá của bác sĩ theo id
export const getRatingOfDoctor = createAsyncThunk(
  // Tên action
  "userDoctors/getRatingOfDoctor",
  async (data) => {
    // Gọi lên API backend/v1/patient/rating/v1/patient/rating
//    console.log(data);

    const param = new URLSearchParams({
      doctorId: data,
    });
   //s console.log(param.toString());
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/patient/rating?` + param.toString(),
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
   // console.log(jsonData);
    return jsonData.data;
  }
);
export default RatingDoctor;
