import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const Conversation = createSlice({
  name: "listConversation",
  initialState: {
    data: [],
    dataMessage: [],
    img: [],
  },
  reducers: {
    arrivalMessageFromSocket: (state, action) => {
      state.dataMessage.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversation.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchAllmessage.fulfilled, (state, action) => {
      state.dataMessage = action.payload;
    });
    builder.addCase(fetchUploadFiles.fulfilled, (state, action) => {
      state.img = action.payload;
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

    return jsonData.data.reverse();
  }
);
//Gửi tin nhắn/v1/chat/{id}
export const fetchPostMessage = createAsyncThunk(
  // Tên action
  "user/fetchPostMessage ",
  async (data) => {
    // Gọi lên API backend
    const { idConversation } = data;
    const { typeMessage, content, file } = data;

    const getToken = JSON.parse(localStorage.getItem("user_login"));
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/chat/${idConversation}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
        body: JSON.stringify({ typeMessage, content, file }),
      }
    );

    // Convert dữ liệu ra json
    const jsonData = await response.json();

    return jsonData;
  }
);
const createFormData = (data) => {
  const { files } = data;
  const dataForm = new FormData();

  if (files.length === 1) {
    dataForm.append("files", files[0].data);
  } else if (files.length > 1) {
    files.forEach((img) => {
      dataForm.append("files", img.data);
    });
  } else {
    dataForm.append("files", files);
  }

  return dataForm;
};
export const fetchUploadFiles = createAsyncThunk(
  "messages/fetchApiSendMessage",
  async (data) => {
    if (data) {
      let formData = createFormData(data);
      const getToken = JSON.parse(localStorage.getItem("user_login"));
      const resFormData = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/upload`,
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

export default Conversation;
