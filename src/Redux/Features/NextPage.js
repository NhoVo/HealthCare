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
      console.log(action.payload);
      state.medicalRecord = action.payload;
    },
    NextPageChangeBook: (state, action) => {
      console.log(action.payload);

      state.book = action.payload;
    },
    NextPageChangeInfor: (state, action) => {
      console.log(action.payload);

      state.infor = action.payload;
    },
    NextPageChangeInforDoctor: (state, action) => {
      console.log(action.payload);

      state.inforDoctor = action.payload;
    },
  },
});

export default NextPage;
