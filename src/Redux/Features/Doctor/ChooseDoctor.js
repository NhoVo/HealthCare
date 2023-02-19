import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchChooseDoctor = createAsyncThunk(
  "doctorC/fetchChooseDoctor",
  async (data, { rejectWithValue }) => {
    try {
      const getToken = JSON.parse(localStorage.getItem("user_login"));
      console.log(data);
      // check token
      if (getToken !== null) {
        return fetch(`${process.env.REACT_APP_BASE_URL}/patient/select`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getToken}`,
          },
          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            return data.data;
          });
      }
    } catch (err) {
      console.log(err);
      rejectWithValue(err);
    }
  }
);

const ChooseDoctor = createSlice({
  name: "doctorC",
  initialState: { data: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchChooseDoctor.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
    });
  },
});
export default ChooseDoctor;
