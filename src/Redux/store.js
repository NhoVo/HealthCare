import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./Features/filter/filterSlice";
import HealthRecord from "./Features/HealthRecord/HealthRecord";
import Heartbeat from "./Features/HealthRecord/Heartbeat";
import NextPage from "./Features/NextPage";
import UserDoctors from "./Features/Users/UserDoctors";
import userLoginSlice from "./Features/Users/UserLoginSlice";

const store = configureStore({
  reducer: {
    nextPages: NextPage.reducer,
    user: userLoginSlice.reducer,
    filters: filterSlice.reducer,
    listUserDoctors: UserDoctors.reducer,
    healthRecordDay: HealthRecord.reducer,
    listHeartbeat: Heartbeat.reducer,
    
  },
});

export default store;
