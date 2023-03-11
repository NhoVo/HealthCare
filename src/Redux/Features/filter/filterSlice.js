import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    data: [],
  },
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
  },
});

// export const searchGG = createAsyncThunk(
//   // Tên action
//   "user/searchGG",
//   async (search) => {
//     // Gọi lên API backend/v1/notification/{id}/read  /v1/notification/{id}/read
//     let data = JSON.stringify({
//       q: search,
//       gl: "vn",
//       hl: "vi",
//     });
//     let config = {
//       method: "post",
//       url: "https://google.serper.dev/search",
//       headers: {
//         "X-API-KEY": "3c304bb7b4de63487c7d2bca4bd87de1c326d4ad",
//         "Content-Type": "application/json",
//       },
//       data: data,
//     };
//     const res = await axios(config);
//     console.log(res.data);

//     return res.data;

//     // axios(config)
//     //   .then((response) => {
//     //     console.log(response.data);
//     //     return response.data;
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   });
//   }
// );

export default filterSlice;
