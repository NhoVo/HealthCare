import { createSlice } from "@reduxjs/toolkit";

const NextPage = createSlice({
  name: "nextPages",
  initialState: {
    medicalRecord: "",
    book: "",
    infor: "",
  },
  reducers: {
    NextPageChange: (state, action) => {
      state.medicalRecord = action.payload;

      console.log(state.medicalRecord);
    },
    NextPageChangeBook: (state, action) => {
      state.book = action.payload;

      console.log(state.book);
    },
    NextPageChangeInfor: (state, action) => {
      state.infor = action.payload;

      console.log(state.infor);
    },
  },
});

export default NextPage;
