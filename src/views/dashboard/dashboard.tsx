import React from "react";
import { EntriesDateChart } from "./components/EntriesDateCharts";
import { EntriesCreatorChart } from "./components/EntriesCreatorChart";
import { CampDataChart } from "./components/CampDataChart";
export const Dashboard = () => {
  return (
    <div
      style={{
        width: "90%",
        height: "83vh",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <CampDataChart />
      <EntriesCreatorChart />
      <EntriesDateChart />
    </div>
  );
};
