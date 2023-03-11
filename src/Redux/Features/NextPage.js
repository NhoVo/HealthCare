import { createSlice } from "@reduxjs/toolkit";

const NextPage = createSlice({
  name: "nextPages",
  initialState: {
    medicalRecord: "",
    book: "",
    infor: "",
    inforDoctor: "",
  },
  reducers: {
    NextPageChange: (state, action) => {
      state.medicalRecord = action.payload;
    },
    NextPageChangeBook: (state, action) => {
      state.book = action.payload;
    },
    NextPageChangeInfor: (state, action) => {
      state.infor = action.payload;
    },
    NextPageChangeInforDoctor: (state, action) => {
      state.inforDoctor = action.payload;
    },
  },
});

export default NextPage;
