import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  healthRecordDay,
  postHealthRecord,
} from "../../Redux/Features/HealthRecord/HealthRecord";
import { postNotification } from "../../Redux/Features/Notifications/Notifications";
import { healthWarningDay, tam } from "../../Redux/selector";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import styles from "./AddInformation.module.scss";
import { ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);
const AddInformation = ({ handleModelCloseInfo, user }) => {
  const { handleSubmit } = useForm();
  const [weight, setWeight] = useState("");
  const [hight, setHight] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [glucose, setGlucose] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [heartbeat, setHeartbeat] = useState("");
  const healtDay = useSelector(tam);

  const dispatch = useDispatch();

  const handleHealthRecord = () => {
    const data = {
      height: hight,
      weight: weight,
      heartRateIndicator: heartbeat,
      systolic: systolic,
      diastolic: diastolic,
      glucose: glucose,
      cholesterol: cholesterol,
    };
    dispatch(postHealthRecord(data)).then((v) => {
      console.log(v);
      if (v !== null) {
        toast.success("Thêm thông tin thành công");
        setWeight("");
        setHight("");
        setSystolic("");
        setDiastolic("");
        setGlucose("");
        setCholesterol("");
        setHeartbeat("");
      }
    });
  };

  return (
    <div className={cx("header-title")}>
      <ToastContainer />

      <form onSubmit={handleSubmit(handleHealthRecord)}>
        <div className={cx("form-group py-2")}>
          <h1 className={cx("title")}>Chỉ số BMI: </h1>
          <div className={cx("form-group-1")}>
            <div className={cx("input-field")}>
              <TextInput
                id="outlined-helperText"
                label="Cân nặng (Kg)"
                placeholder="Nhập chỉ số cân nặng..."
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className={cx("input-field")}>
              <TextInput
                id="outlined-helperText"
                label="Chiều cao (Cm)"
                placeholder="Nhập chỉ số Chiều cao..."
                value={hight}
                onChange={(e) => setHight(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={cx("form-group py-2")}>
          <h1 className={cx("title")}>Chỉ số Huyết áp: </h1>
          <div className={cx("form-group-1")}>
            <div className={cx("input-field")}>
              <TextInput
                id="outlined-helperText"
                label="Huyết áp tâm thụ (mmHg)"
                placeholder="Nhập chỉ số huyết áp tâm thụ..."
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
              />
            </div>
            <div className={cx("input-field")}>
              <TextInput
                id="outlined-helperText"
                label="Huyết áp tâm trương (mmHg)"
                placeholder="Nhập chỉ số Huyết áp tâm trương..."
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={cx("form-group py-2")}>
          <h1 className={cx("title")}>Chỉ số Cholesterol: </h1>
          <div className={cx("form-group-1")}>
            <div className={cx("input-field")}>
              <TextInput
                id="outlined-helperText"
                label="Cholesterol (mg/dL)"
                placeholder="Nhập chỉ số Cholesterol..."
                value={cholesterol}
                onChange={(e) => setCholesterol(e.target.value)}
              />
            </div>
            <div className={cx("form-group-Glucose")}>
              <h1 className={cx("title")}>Chỉ số Glucose: </h1>
              <div className={cx("input-field")}>
                <TextInput
                  id="outlined-helperText"
                  label="Glucose (mmHg)"
                  placeholder="Nhập chỉ số Glucose..."
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={cx("form-group py-2")}>
          <h1 className={cx("title")}>Chỉ số Nhịp tim: </h1>
          <div className={cx("form-group-1")}>
            <div className={cx("input-field-tim")}>
              <TextInput
                id="outlined-helperText"
                label="Nhip tim (nhịp/phút)"
                placeholder="Nhập chỉ số nhịp tim..."
                value={heartbeat}
                onChange={(e) => setHeartbeat(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={cx("btn-add")}>
          <Button>Thêm</Button>
        </div>
      </form>
    </div>
  );
};

export default AddInformation;
