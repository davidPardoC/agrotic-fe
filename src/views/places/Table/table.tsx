import { CompassFilled } from "@ant-design/icons";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { PlacesServices } from "../../../services/places-service";

export const PlacesTable = ({
  refreshTable,
  refreshTableFlag,
}: {
  refreshTable: (value:boolean) => void;
  refreshTableFlag: boolean;
}) => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    if(refreshTableFlag){
      getData()
      refreshTable(false)
    }
  },[refreshTableFlag])
  const getData = async () => {
    const data = await PlacesServices.getTable(1);
    if (data) {
      setTableData(
        data.map((item: any, index: number) => ({ ...item, key: index }))
      );
    }
  };
  return (
    <Table
      columns={columns}
      dataSource={tableData}
      style={{ marginTop: "1em" }}
    />
  );
};

const columns = [
  { title: "Nombre", dataIndex: "name", key: "name" },
  { title: "Descripcion", dataIndex: "desc", key: "desc" },
  { title: "Fecha", dataIndex: "date", key: "date" },
  {
    title: "Ubicacion",
    dataIndex: "coordenates",
    key: "coordenates",
    render: (text: any[]) =>
      text.length === 2 ? (
        <CompassFilled
          className="hover"
          onClick={() => {
            console.log(text);
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${text[0]},${text[1]}`
            );
          }}
          style={{ fontSize: 25 }}
        />
      ) : (
        <div></div>
      ),
  },
];
