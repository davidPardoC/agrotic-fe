import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { ReportService } from "../../../services/report-service";
export const EntriesDateChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getChartData();
  }, []);
  const getChartData = async () => {
    const data = await ReportService.getEntriesByDate();
    if (data) {
      setData(data);
    }
  };
  return (
    <div
      style={{
        width: "50%",
        height: "50%",
        marginTop: "2rem",
        borderTop: "1px solid rgba(0,0,0,0.3)",
      }}
    >
      <h3 style={{ marginLeft: "2rem" }}>Entradas por fecha:</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#1890FF"
            fill="#1890FF"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
