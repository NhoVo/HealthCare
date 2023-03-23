import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const Conversation = createSlice({
  name: "listConversation",
  initialState: {
    data: [],
    dataMessage: [],
  },
  reducers: {
    arrivalMessageFromSocket: (state, action) => {
      const newMessage = action.payload;
      state.dataMessage.push(action.payload);

      // const messageId = state.data.find(
      //   (message) => message._id === newMessage._id
      // );

      // // check
      // if (!messageId) {
      //   state.data.push(action.payload);
      // } else {
      //   console.log("Existing message id!!!");
      //   return;
      // }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversation.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchAllmessage.fulfilled, (state, action) => {
      state.dataMessage = action.payload;
    });
  },
});

//get conversation
export const fetchConversation = createAsyncThunk(
  // Tên action
  "user/fetchConversation",
  async (data) => {
    // Gọi lên API backend
    const param = new URLSearchParams({
      pageSize: 5,
      page: 1,
    });
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/conversation`,
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
//lay tin nhan tin nhan
export const fetchAllmessage = createAsyncThunk(
  // Tên action/v1/chat/{id}
  "user/fetchAllmessage",
  async (data) => {
    // Gọi lên API backend

    const param = new URLSearchParams({
      isAll: true,
    });
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/chat/${data}?` + param.toString(),
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
//Gửi tin nhắn/v1/chat/{id}
export const fetchPostMessage = createAsyncThunk(
  // Tên action
  "user/fetchPostMessage ",
  async (data) => {
    // Gọi lên API backend
    const { idConversation } = data;
    const { typeMessage, content } = data;
    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/chat/${idConversation}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify({ typeMessage, content }),
      }
    );

    // Convert dữ liệu ra json
    const jsonData = await response.json();

    return jsonData;
  }
);

export default Conversation;
