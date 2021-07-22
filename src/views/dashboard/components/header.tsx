import { HomeFilled, UserOutlined } from "@ant-design/icons";
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
    <Wrapper>
      <Item>
        <HomeFilled style={{ fontSize: "2em" }} />
        <span>
          {" "}
          <strong>{stats.places}</strong> Lugares
        </span>
      </Item>
      <Item>
        <UserOutlined style={{ fontSize: "2em" }} />
        <span>
          {" "}
          <strong>{stats.users}</strong> Usuarios
        </span>
      </Item>
      <Item>
        <i className="fas fa-seedling"></i>
        <span>
          <strong>{stats.plants}</strong> Plantas
        </span>
      </Item>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  background-color: #b1b1b149;
  border-radius: 2em;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5em;
  justify-content: space-around;
`;

const Item = styled.div`
  background-color: #b1b1b194;
  border-radius: 1em;
  padding: 0.3em;
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > i {
    font-size: 2em;
  }
  & > span {
    margin-left: 0.5em;
  }
`;
