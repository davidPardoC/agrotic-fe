import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ReportService } from "../../../services/report-service";

export const CampDataChart = () => {
  const [data, setData] = useState([])
  useEffect(()=>{
    getChartData()
  },[])
  const getChartData = async() => {
    const data = await ReportService.getCampDataByDate()
    if(data){
      setData(data)
    }
  }
  return (
    <div style={{width:'100%', height:'49%'}}>
      <h3 style={{marginLeft:'2rem'}}>Datos de campo por creador:</h3>
      <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
};
