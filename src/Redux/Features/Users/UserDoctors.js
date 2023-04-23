import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UserDoctors = createSlice({
  name: "listUserDoctors",
  initialState: { data: [], userDoctor: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDoctors.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchUserDoctor.fulfilled, (state, action) => {
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
    return jsonData.data;
  }
);
export const updateUserDoctor = createAsyncThunk(
  // Tên action
  "userDoctors/updateUserDoctor",
  async (data) => {
    // Gọi lên API backend//v1//v1/doctor

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/doctor`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
      },
      body: JSON.stringify(data),
    });
    // Convert dữ liệu ra json/v1/notification/read-all
    const jsonData = await response.json();

    return jsonData;
  }
);
const createFormData = (dataImg) => {
  const { files } = dataImg;
  const dataForm = new FormData();

  dataForm.append("file", files);

  return dataForm;
};
export const updateAvatar = createAsyncThunk(
  "userDoctors/updateAvatar",
  async (dataImg) => {
    if (dataImg) {
      ///v1/user/avatar
      let formData = createFormData(dataImg);
      const getToken = JSON.parse(localStorage.getItem("user_login"));
      const resFormData = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/user/avatar`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      return resFormData.data;
    }
  }
);
export default UserDoctors;
