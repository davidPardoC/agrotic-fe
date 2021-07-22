import React from "react";
import { EntriesDateChart } from "./components/EntriesDateCharts";
import { EntriesCreatorChart } from "./components/EntriesCreatorChart";
import { CampDataChart } from "./components/CampDataChart";
import { Col, Row } from "antd";
import { DashboardHeader } from "./components/header";
export const Dashboard = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        overflowY:'scroll',
        overflowX:'hidden'
      }}
    >
      <Row>
        <DashboardHeader/>
        <Col lg={24}>
          <CampDataChart />
        </Col>
        <Col lg={12}>
          <EntriesCreatorChart />
        </Col>
        <Col lg={12}>
          <EntriesDateChart />
        </Col>
      </Row>
    </div>
  );
};
