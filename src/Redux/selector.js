import { createSelector } from "@reduxjs/toolkit";
import moment from "moment";
//tim gg
export const resultSearchGG = (state) => state.searchGoogle.data;
export const resultSearchGGMap = (state) => state.searchGoogle.dataMap;
export const nextPageSelector = (state) => state.nextPages.medicalRecord;
export const nextPageSelectorBook = (state) => state.nextPages.book;
export const nextPageSelectorInfor = (state) => state.nextPages.infor;
export const nextPageSelectorInforDoctor = (state) =>
  state.nextPages.inforDoctor;
export const userLogin = (state) => state.user.data;
export const searchTextSelector = (state) => state.filters.search;
export const userDoctors = (state) => state.listUserDoctors.data;
export const healthRD = (state) => state.healthRecordDay.data;
export const listHeartbeat = (state) => state.listHeartbeat.data;
export const listBMI = (state) => state.listHeartbeat.bmi;
export const listBloodPressures = (state) => state.listHeartbeat.bloodPressures;
export const listCholesterol = (state) => state.listHeartbeat.cholesterol;
export const listGlucoses = (state) => state.listHeartbeat.glucoses;
export const userDoctorPatient = (state) => state.listUserDoctors.userDoctor;
export const patientBookedSchedule = (state) =>
  state.patientBook.bookedSchedule;
export const patientBookeDetail = (state) => state.patientBook.bookDetail;

export const allNotifiDoctor = (state) => state.notifications.allNotifications;
export const allHealthRecord = (state) => state.healthRecordDay.allHrecord;

//bác sĩ
export const userPatients = (state) => state.listUserPatient.userPatients;
export const listBookDoctor = (state) => state.doctorBook.listBookDoctor;
export const allHRecordPaient = (state) => state.healthRecordDay.allHRPatient;
export const listHeartbeatDoctor = (state) => state.listHPatient.dataDoctor;
export const listBMIDoctor = (state) => state.listHPatient.bmiDoctor;
export const listBloodPressuresDoctor = (state) =>
  state.listHPatient.bloodPressuresDoctor;
export const listCholesterolDoctor = (state) =>
  state.listHPatient.cholesterolDoctor;
export const listGlucosesDoctor = (state) => state.listHPatient.glucosesDoctor;
export const usersRemainingSelector = createSelector(
  userDoctors,
  searchTextSelector,

  (users, search) => {
    if (search) {
      if (search.startsWith("0")) {
        //don't find
        const usersFilter = users.filter((_user) => _user.phone === search);

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
//tim theo sdt benh nhan
export const filterPhonePatient = createSelector(
  userPatients,
  searchTextSelector,

  (users, search) => {
    if (search) {
      if (search.startsWith("0")) {
        //don't find
        const usersFilter = users.filter((_user) => _user.phone === search);

        // don't find
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

        // /tim theo ten nguoi da kp

        // Cái này check bắt đầu từ A-Z (sau sửa lại cho giống người Việt)
      }
    } else {
      return 1;
    }
    return false;
  }
);
export const indexReadNotifications = createSelector(
  allNotifiDoctor,
  (index) => {
    const indexRead = index?.filter((_id) => _id.isRead === false);
    return indexRead.length;
  }
);
export const ChartHeartbeat = createSelector(
  listHeartbeat,

  (lhb) => {
    return lhb?.map((l, index) => ({
      id: l.id,
      heartRateIndicator: l.heartRateIndicator,
      createdAt: moment(l.createdAt).format("DD/MM/YYYY"),
    }));
  }
);
export const ChartBMI = createSelector(listBMI, (bmi) => {
  return bmi?.map((b) => ({
    id: b.id,
    indexBmi: b.indexBmi,
    createdAt: moment(b.createdAt).format("DD/MM/YYYY"),
  }));
});
export const ChartBloodPressures = createSelector(listBloodPressures, (lbp) => {
  return lbp?.map((bp) => ({
    id: bp.id,
    diastolic: bp.diastolic,
    systolic: bp.systolic,
    createdAt: moment(bp.createdAt).format("DD/MM/YYYY"),
  }));
});
export const ChartCholesterol = createSelector(listCholesterol, (cl) => {
  return cl?.map((c) => ({
    id: c.id,
    cholesterol: c.cholesterol,

    createdAt: moment(c.createdAt).format("DD/MM/YYYY"),
  }));
});
export const ChartGlucoses = createSelector(listGlucoses, (lg) => {
  return lg?.map((c) => ({
    id: c.id,
    glucose: c.glucose,
    createdAt: moment(c.createdAt).format("DD/MM/YYYY"),
  }));
});
//danh sach lich hen
export const listBookPatient = createSelector(patientBookedSchedule, (pb) => {
  const listBookPatient = pb?.filter(
    (_pb) =>
      _pb.statusAppointment !== "CANCELED" &&
      _pb.statusAppointment !== "APPROVED"
  );

  return listBookPatient;
});

//thao tac bac sĩ
export const getListBookDoctor = createSelector(listBookDoctor, (lb) => {
  const listBookDoctor = lb?.filter(
    (_lb) =>
      _lb.statusAppointment !== "CANCELED" &&
      _lb.statusAppointment !== "APPROVED"
  );
  return listBookDoctor;
});
export const getListBookDoctorAccept = createSelector(listBookDoctor, (lb) => {
  const listAccept = lb?.filter((_lb) => _lb.statusAppointment === "APPROVED");
  return listAccept;
});
export const ChartHeartbeatDoctor = createSelector(
  listHeartbeatDoctor,
  (lhb) => {
    return lhb?.map((l, index) => ({
      id: l.id,
      heartRateIndicator: l.heartRateIndicator,
      createdAt: moment(l.createdAt).format("DD/MM/YYYY"),
    }));
  }
);
export const ChartBMIDoctor = createSelector(listBMIDoctor, (bmi) => {
  return bmi?.map((b) => ({
    id: b.id,
    indexBmi: b.indexBmi,
    createdAt: moment(b.createdAt).format("DD/MM/YYYY"),
  }));
});
export const ChartBloodPressuresDoctor = createSelector(
  listBloodPressuresDoctor,
  (lbp) => {
    return lbp?.map((bp) => ({
      id: bp.id,
      diastolic: bp.diastolic,
      systolic: bp.systolic,
      createdAt: moment(bp.createdAt).format("DD/MM/YYYY"),
    }));
  }
);
export const ChartCholesterolDoctor = createSelector(
  listCholesterolDoctor,
  (cl) => {
    return cl?.map((c) => ({
      id: c.id,
      cholesterol: c.cholesterol,

      createdAt: moment(c.createdAt).format("DD/MM/YYYY"),
    }));
  }
);
export const ChartGlucosesDoctor = createSelector(listGlucosesDoctor, (lg) => {
  return lg?.map((c) => ({
    id: c.id,
    glucose: c.glucose,
    createdAt: moment(c.createdAt).format("DD/MM/YYYY"),
  }));
});
