import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  QrcodeOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Button, Pagination, Table, Tooltip } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { PlantsService } from "../../../services/plants-service";
import QRCode from "qrcode.react";
import { QRWrapper } from "./styled-components";
import { DateTime } from "luxon";
import { PlantTableResponse } from "../../../services/types/plats-types";
import { useHistory, useRouteMatch } from "react-router";
export const PlantsTable = ({ openUpdateModal, isAddedPlant }: any) => {
  let history = useHistory();
  let { path, url } = useRouteMatch();
  const [dataSource, setDataSource] = useState<PlantTableResponse>();
  const [tableResponse, setTableResponse] = useState<PlantTableResponse>();

  useEffect(() => {
    getDataTable();
  }, [isAddedPlant]);

  const getDataTable = async (page = 1) => {
    const data = await PlantsService.getPlantsTable(page);
    setTableResponse(data);
    const tableResponse = data?.docs.map((item, i) => ({
      ...item,
      key: i,
      createdBy: `${item.createdBy?.firstName} ${item.createdBy?.lastName}`,
      createdAt: DateTime.fromISO(item.createdAt).toFormat(
        "yyyy-LL-dd , HH:mm"
      ),
      qrCode: <ItemQr id={item._id} />,
      actions: (
        <div style={{ display: "flex" }}>
          <EditOutlined
            onClick={() => {
              openUpdateModal(item._id);
            }}
            className="hover"
            style={{ fontSize: "1.4rem" }}
          />{" "}
          <DeleteItem item={item} getDataTable={getDataTable} />
          <Tooltip title="Datos de Campo">
            <TableOutlined
              className="hover"
              style={{ fontSize: "1.4rem", marginLeft: "0.5rem" }}
              onClick={() => {
                let route = [];
                route = url.split("/");
                route.pop();
                history.push(
                  `${
                    route.join("/") +
                    "/camp-data/" +
                    item._id +
                    "/" +
                    item.commonName
                  }`
                );
              }}
            />
          </Tooltip>
        </div>
      ),
    }));
    setDataSource(tableResponse as any);
  };
  const columns: any = [
    {
      title: "Nombre",
      dataIndex: "commonName",
      key: "commonName",
      responsive: ["xs", "md"],
    },
    {
      title: "Nombre Cientifico",
      dataIndex: "cientificName",
      key: "cientificName",
      responsive: ["md"],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["md"],
    },
    {
      title: "Creador por",
      dataIndex: "createdBy",
      key: "createdBy",
      responsive: ["md"],
    },
    {
      title: "Codigo QR",
      dataIndex: "qrCode",
      key: "qrCode",
      responsive: ["md"],
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      responsive: ["xs", "md"],
    },
  ];

  return (
    <div>
      <Table
        pagination={{ position: [] }}
        columns={columns}
        dataSource={dataSource as any}
      />
      <Pagination
        style={{ marginTop: "1rem" }}
        current={tableResponse?.page as number}
        total={tableResponse?.totalDocs}
        onChange={(e) => {
          getDataTable(e);
        }}
      />
    </div>
  );
};

const ItemQr = ({ id }: any) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Modal
        footer={[]}
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <QRWrapper>
          <QRCode
            id="qr-wrapper"
            renderAs="canvas"
            value={id}
            style={{ width: "50%", height: "auto" }}
          />
          <Button
            size="large"
            type="primary"
            icon={<DownloadOutlined />}
            style={{ marginTop: "1rem" }}
            onClick={() => {
              var canvas = document.getElementById("qr-wrapper");
              var img = (canvas as any).toDataURL("image/png");
              var link = document.createElement("a");
              link.download = id+'.png';
              link.href = img;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Descargar
          </Button>
        </QRWrapper>
      </Modal>
      <QrcodeOutlined
        className="hover"
        style={{ fontSize: "1.4rem" }}
        onClick={() => {
          setShowModal(true);
        }}
      />
    </div>
  );
};

const DeleteItem = ({ item, getDataTable }: any) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const deleteItem = async () => {
    await PlantsService.deletePlantById(item._id);
    getDataTable();
    setOpenDeleteModal(false);
  };
  return (
    <div>
      <Modal
        visible={openDeleteModal}
        onCancel={() => {
          setOpenDeleteModal(false);
        }}
        footer={[
          <Button key="1">Cancel</Button>,
          <Button
            key="2"
            onClick={() => {
              deleteItem();
            }}
            type="primary"
            danger
          >
            Elimina
          </Button>,
        ]}
      >
        <h2 style={{ textAlign: "center" }}>¿Desea elimnar el registro?</h2>
        <h3 style={{ textAlign: "center" }}>{item.commonName}</h3>
        <h3 style={{ textAlign: "center" }}>{item.cientificName}</h3>
      </Modal>
      <DeleteOutlined
        className="hover"
        style={{ fontSize: "1.4rem", marginLeft: "1rem" }}
        onClick={() => {
          setOpenDeleteModal(true);
        }}
      />
    </div>
  );
};
