import React from "react";
import classNames from "classnames/bind";
import styles from "./Information.module.scss";
import DiseaseIndex from "../../components/DiseaseIndex/DiseaseIndex";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MoodIcon from "@mui/icons-material/Mood";
import { Chair } from "@mui/icons-material";
import Chart from "../../components/Chart/Chart";
const cx = classNames.bind(styles);

const Information = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("col-12")}>
        <h1 className={cx("title")}>Thêm thông tin</h1>
        <button className={cx("addIndex")}>
          <ControlPointIcon sx={{ fontSize: 40 }} />
        </button>
      </div>
      <div className={cx("col-12")}>
        <div className={cx("col-2")}>
          <DiseaseIndex
            name="BMI"
            index="12345"
            percent="46%"
            icon={<ArrowDropDownIcon sx={{ fontSize: 20 }} color="success" />}
          />
        </div>
        <div className={cx("col-2")}>
          <DiseaseIndex
            name="Huyết áp"
            index="12345"
            percent="46%"
            icon={<ArrowDropDownIcon sx={{ fontSize: 20 }} color="success" />}
          />
        </div>
        <div className={cx("col-2")}>
          <DiseaseIndex
            name="Cholesterol"
            index="12345"
            percent="46%"
            icon={<ArrowDropDownIcon sx={{ fontSize: 20 }} color="success" />}
          />
        </div>
        <div className={cx("col-2")}>
          <DiseaseIndex
            name="Glucose"
            index="12345"
            percent="46%"
            icon={<ArrowDropDownIcon sx={{ fontSize: 20 }} color="success" />}
          />
        </div>
        <div className={cx("col-2")}>
          <DiseaseIndex
            name="Nhịp Tim"
            index="12345"
            percent="46%"
            icon={<ArrowDropDownIcon sx={{ fontSize: 20 }} color="success" />}
          />
        </div>
        <div className={cx("col-2")}>
          <DiseaseIndex
            name="Tình trạng"
            index="Tốt"
            icon={<MoodIcon sx={{ fontSize: 20 }} color="success" />}
          />
        </div>
      </div>
      <div className={cx("col-12")}>
        <div className={cx("Chart")}>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Information;
