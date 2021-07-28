import { HomeFilled, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReportService } from "../../../services/report-service";

export const DashboardHeader = () => {
  const [stats, setStats] = useState({ users: 0, plants: 0, places: 0 });
  useEffect(() => {
    getStatistics();
  }, []);
  const getStatistics = async () => {
    const stat = await ReportService.getGeneralStatistics();
    if (stat) {
      setStats(stat);
    }
  };
  return (
    <Row
      gutter={40}
      style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
    >
      <Col span={8}>
        <Card title="Plantas" bordered={false}>
          <Item>
            <HomeFilled style={{ fontSize: "3em" }} />
            <strong>{stats.places}</strong>
          </Item>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Usuarios" bordered={false}>
          <Item>
            <UserOutlined style={{ fontSize: "3em" }} />
            <strong>{stats.users}</strong>
          </Item>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Lugares" bordered={false}>
          <Item>
            <i className="fas fa-seedling"></i>
              <strong>{stats.plants}</strong>
          </Item>
        </Card>
      </Col>
    </Row>
  );
};
{
  /* <Wrapper>
      <Item>
        <HomeFilled style={{ fontSize: "3em" }} />
        <span>
          {" "}
          <strong>{stats.places}</strong> Lugares
        </span>
      </Item>
      <Item>
        <UserOutlined style={{ fontSize: "3em" }} />
        <span>
          {" "}
          <strong>{stats.users}</strong> Usuarios
        </span>
      </Item>
      <Item>
        <i className="fas fa-seedling"></i>
        <span>
          <strong>{stats.plants}</strong> 
          <span>Plantas</span> 
        </span>
      </Item>
    </Wrapper> */
}
const Wrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  background-color: #b1b1b136;
  border-radius: 2em;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5em;
  justify-content: space-around;
`;

const Item = styled.div`
  border-radius: 4px;
  padding: 0.5em 1em;
  width: fit-content;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  & > i {
    font-size: 3em;
  }
  & > strong {
    font-size: 2em;
    margin-left: 1em;
  }
`;
