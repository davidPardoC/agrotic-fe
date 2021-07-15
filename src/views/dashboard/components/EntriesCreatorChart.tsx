import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ReportService } from "../../../services/report-service";

export const EntriesCreatorChart = () => {
  const [data, setData] = useState([])
  useEffect(()=>{
    getChartData()
  },[])

  const getChartData = async() => {
    const data = await ReportService.getEntriesByCreator()
    if(data){
      setData(data)
    }
  }
  return (
    <div style={{width:'50%', height:'50%', marginTop:'2rem', borderTop:'1px solid rgba(0,0,0,0.3)', borderRight:'1px solid rgba(0,0,0,0.3)'}}>
      <h3 style={{marginLeft:'2rem'}}>Entradas por creador:</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <XAxis dataKey="createdBy" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#1890FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
