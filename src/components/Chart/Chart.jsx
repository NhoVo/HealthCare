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
  ChartBMI,
  ChartCholesterol,
  ChartGlucoses,
  ChartHeartbeat,
  listHeartbeat,
} from "../../Redux/selector";

const cx = classNames.bind(styles);
const data = [
  { name: "Page A", uv: 17.99, pv: 2400, amt: 200 },
  { name: "Page B", uv: 0.0, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 0.12, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 7.69, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 0.0, pv: 3800, amt: 2500 },
];
const dataTim = [{ uv: 40 }, { uv: 80 }, { uv: 120 }, { uv: 160 }];

const Chart = ({ BMI, HA, CHOLES, GLU, TIM }) => {
  // const listHB = useSelector(listHeartbeat);
  const listHB = useSelector(ChartHeartbeat);
  const listBMI = useSelector(ChartBMI);
  const listBloodPressures = useSelector(ChartBloodPressures);
  const listCholesterol = useSelector(ChartCholesterol);
  const listGlucoses = useSelector(ChartGlucoses);

  return (
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
  );
};

export default Chart;
