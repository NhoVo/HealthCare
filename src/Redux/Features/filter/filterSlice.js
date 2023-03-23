import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
  },
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default filterSlice;
