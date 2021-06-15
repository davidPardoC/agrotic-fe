import { DownloadOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CampDataService } from "../../../../services/camp-data-service";
import { fireErrorAlert } from "../../../../utils/alerts";
import { tableFields } from "./utils/table-flieds";

export const CampDataScreen = () => {
  const [dataSource, setDataSource] = useState([]);
  let { id, plant } = useParams();
  useEffect(() => {
    getCampData();
  }, []);

  const getCampData = async () => {
    try {
      const campData = await CampDataService.getCampDataById(id);
      console.log(campData);
      setDataSource(
        campData.map((item) => ({
          ...item,
          date: DateTime.fromISO(item.date).toLocaleString(
            DateTime.DATETIME_SHORT_WITH_SECONDS
          ),
        }))
      );
    } catch (error) {
      fireErrorAlert(error);
    }
  };

  const columns = tableFields;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <h1>{plant}</h1>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size="middle"
          shape="round"
          onClick={()=>{
            CampDataService.getExcelReport(id)
          }}
        >
          Download
        </Button>
      </div>

      <Table
        style={{ maxWidth: "90vw" }}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 6500 }}
      />
    </div>
  );
};
