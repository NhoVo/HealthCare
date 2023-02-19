import { createSelector } from "@reduxjs/toolkit";
import moment from "moment";

export const nextPageSelector = (state) => state.nextPages.medicalRecord;
export const nextPageSelectorBook = (state) => state.nextPages.book;
export const nextPageSelectorInfor = (state) => state.nextPages.infor;
export const userLogin = (state) => state.user.data;
export const searchTextSelector = (state) => state.filters.search;
export const userDoctors = (state) => state.listUserDoctors.data;
export const healthRD = (state) => state.healthRecordDay.data;
export const listHeartbeat = (state) => state.listHeartbeat.data;
export const listBMI = (state) => state.listHeartbeat.bmi;
export const listBloodPressures = (state) => state.listHeartbeat.bloodPressures;

export const usersRemainingSelector = createSelector(
  userDoctors,
  searchTextSelector,

  (users, search) => {
    console.log("----", search);
    if (search) {
      if (search.startsWith("0")) {
        //don't find
        const usersFilter = users.filter((_user) => _user.phone === search);
        console.log("----", usersFilter);
        //don't find
        if (!usersFilter.length) {
          return 1;
        }

        return usersFilter.map((user) => ({
          _id: user._id,
          fullName: user.fullName,
          phone: user.phone,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          address: user.address,
          email: user.email,
          description: user.description,
          experience: user.experience,
          workPlace: user.workPlace,
          specialize: user.specialize,
          isFriend: false,
        }));

        ///tim theo ten nguoi da kp

        //Cái này check bắt đầu từ A-Z (sau sửa lại cho giống người Việt)
      }
    } else {
      return 1;
    }
    return false;
  }
);
export const ChartHeartbeat = createSelector(listHeartbeat, (lhb) => {
  return lhb.map((l, index) => ({
    id: l.id,
    heartRateIndicator: l.heartRateIndicator,
    createdAt: moment(l.createdAt).format("DD/MM/YYYY"),
  }));
});
export const ChartBMI = createSelector(listBMI, (bmi) => {
  return bmi.map((b) => ({
    id: b.id,
    indexBmi: b.indexBmi,
    createdAt: moment(b.createdAt).format("DD/MM/YYYY"),
  }));
});
export const ChartBloodPressures = createSelector(listBloodPressures, (lbp) => {
  return lbp.map((bp) => ({
    id: bp.id,
    diastolic: bp.diastolic,
    systolic: bp.systolic,
    createdAt: moment(bp.createdAt).format("DD/MM/YYYY"),
  }));
});
