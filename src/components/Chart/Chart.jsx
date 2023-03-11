import React from "react";
import classNames from "classnames/bind";
import styles from "./Chart.module.scss";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import {
  ChartBloodPressures,
  ChartBloodPressuresDoctor,
  ChartBMI,
  ChartBMIDoctor,
  ChartCholesterol,
  ChartCholesterolDoctor,
  ChartGlucoses,
  ChartGlucosesDoctor,
  ChartHeartbeat,
  ChartHeartbeatDoctor,
  listHeartbeat,
  userLogin,
} from "../../Redux/selector";

const cx = classNames.bind(styles);

const Chart = ({ BMI, HA, CHOLES, GLU, TIM }) => {
  // const listHB = useSelector(listHeartbeat);
  const listHB = useSelector(ChartHeartbeat);
  const listBMI = useSelector(ChartBMI);
  const listBloodPressures = useSelector(ChartBloodPressures);
  const listCholesterol = useSelector(ChartCholesterol);
  const listGlucoses = useSelector(ChartGlucoses);
  const userDoctor = useSelector(userLogin);
  //bác sĩ
  const listHBDoctor = useSelector(ChartHeartbeatDoctor);
  const listBMIDoctor = useSelector(ChartBMIDoctor);
  const listBloodPressuresDoctor = useSelector(ChartBloodPressuresDoctor);
  const listCholesterolDoctor = useSelector(ChartCholesterolDoctor);
  const listGlucosesDoctor = useSelector(ChartGlucosesDoctor);

  return (
    <>
      {userDoctor.role === "DOCTOR" ? (
        <>
          <div className={cx("Chart")}>
            {BMI ? (
              <LineChart
                width={800}
                height={400}
                data={listBMIDoctor}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="createdAt" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="indexBmi"
                  stroke="#003000"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                  name="BMI"
                />
              </LineChart>
            ) : null}

            {HA ? (
              <LineChart
                width={800}
                height={400}
                data={listBloodPressuresDoctor}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="#82ca9d"
                  name="Tâm thu"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#8884d8"
                  name="Tâm trương"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              </LineChart>
            ) : null}
            {CHOLES ? (
              <LineChart
                width={800}
                height={400}
                data={listCholesterolDoctor}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="createdAt" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cholesterol"
                  stroke="#0851FF"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              </LineChart>
            ) : null}
            {GLU ? (
              <LineChart
                width={800}
                height={400}
                data={listGlucosesDoctor}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="createdAt" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="glucose"
                  stroke="#0851FF"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              </LineChart>
            ) : null}
            {TIM ? (
              <LineChart
                width={800}
                height={400}
                data={listHBDoctor}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="createdAt" />
                <YAxis />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="heartRateIndicator"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                  name="Tim mạch"
                />
              </LineChart>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className={cx("Chart")}>
            {BMI ? (
              <LineChart
                width={1050}
                height={400}
                data={listBMI}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="createdAt" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="indexBmi"
                  stroke="#003000"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                  name="BMI"
                />
              </LineChart>
            ) : null}

            {HA ? (
              <LineChart
                width={1050}
                height={400}
                data={listBloodPressures}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="#82ca9d"
                  name="Tâm thu"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#8884d8"
                  name="Tâm trương"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              </LineChart>
            ) : null}
            {CHOLES ? (
              <LineChart
                width={1050}
                height={400}
                data={listCholesterol}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="createdAt" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cholesterol"
                  stroke="#0851FF"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              </LineChart>
            ) : null}
            {GLU ? (
              <LineChart
                width={1050}
                height={400}
                data={listGlucoses}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="createdAt" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="glucose"
                  stroke="#0851FF"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              </LineChart>
            ) : null}
            {TIM ? (
              <LineChart
                width={1050}
                height={400}
                data={listHB}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="createdAt" />
                <YAxis />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="heartRateIndicator"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                  name="Tim mạch"
                />
              </LineChart>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Chart;
