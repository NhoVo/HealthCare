import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const searchgg = createSlice({
  name: "searchGoogle",
  initialState: {
    data: [],
    dataMap: [],
  },
  extraReducers: (builder) => {
    builder.addCase(searchGG.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(searchGGMap.fulfilled, (state, action) => {
      state.dataMap = action.payload;
    });
  },
});
export const searchGG = createAsyncThunk(
  // Tên action
  "searchgg/searchGG",
  async (search) => {
    // Gọi lên API backend/v1/notification/{id}/read  /v1/notification/{id}/read
    let data = JSON.stringify({
      q: search,
      gl: "vn",
      hl: "vi",
    });
    let config = {
      method: "post",
      url: "https://google.serper.dev/search",
      headers: {
        "X-API-KEY": "3c304bb7b4de63487c7d2bca4bd87de1c326d4ad",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);

    const dataResult = res.data.organic;

    return dataResult;
  }
);
//địa chỉ
export const searchGGMap = createAsyncThunk(
  // Tên action
  "searchgg/searchGGMap",
  async (search) => {
    // Gọi lên API backend/v1/notification/{id}/read  /v1/notification/{id}/read
    let data = JSON.stringify({
      q: search,
      gl: "vn",
      hl: "vi",
    });
    let config = {
      method: "post",
      url: "https://google.serper.dev/places",
      headers: {
        "X-API-KEY": "3c304bb7b4de63487c7d2bca4bd87de1c326d4ad",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);

    const dataResult = res.data.places;

    return dataResult;
  }
);
export default searchgg;
