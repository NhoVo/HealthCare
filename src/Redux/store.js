import { configureStore } from "@reduxjs/toolkit";
import DoctorBook from "./Features/Book/DoctorBook";
import PatientBook from "./Features/Book/PatientBook";
import filterSlice from "./Features/filter/filterSlice";
import searchgg from "./Features/filter/searchgg";
import HealthRecord from "./Features/HealthRecord/HealthRecord";
import Heartbeat from "./Features/HealthRecord/Heartbeat";
import HeartbeatPatient from "./Features/HealthRecord/HeartbeatPatient";
import NextPage from "./Features/NextPage";
import Notifications from "./Features/Notifications/Notifications";
import UserDoctors from "./Features/Users/UserDoctors";
import userLoginSlice from "./Features/Users/UserLoginSlice";
import userPatient from "./Features/Users/userPatient";

const store = configureStore({
  reducer: {
    nextPages: NextPage.reducer,
    user: userLoginSlice.reducer,
    filters: filterSlice.reducer,
    listUserDoctors: UserDoctors.reducer,
    healthRecordDay: HealthRecord.reducer,
    listHeartbeat: Heartbeat.reducer,
    patientBook: PatientBook.reducer,
    notifications: Notifications.reducer,
    listUserPatient: userPatient.reducer,
    doctorBook: DoctorBook.reducer,
    listHPatient: HeartbeatPatient.reducer,
    searchGoogle: searchgg.reducer,
  },
});

export default store;
