import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  QrcodeOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Button, Col, Pagination, Row, Select, Table, Tooltip } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { PlantsService } from "../../../services/plants-service";
import QRCode from "qrcode.react";
import { QRWrapper } from "./styled-components";
import { DateTime } from "luxon";
import { PlantTableResponse } from "../../../services/types/plats-types";
import { useHistory, useRouteMatch } from "react-router";
import { UserService } from "../../../services/user-service";
import { PlacesServices } from "../../../services/places-service";
export const PlantsTable = ({ openUpdateModal, isAddedPlant }: any) => {
  let history = useHistory();
  let { path, url } = useRouteMatch();
  const [dataSource, setDataSource] = useState<PlantTableResponse>();
  const [tableResponse, setTableResponse] = useState<PlantTableResponse>();
  const [users, setUsers] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [curentUser, setCurrentUser] = useState('')
  const [currentPlace, setCurrentPLace] = useState('')

  useEffect(() => {
    getFilters()
    getDataTable();
  }, [isAddedPlant]);

  const getDataTable = async (page = 1, place='',author='') => {
    const data = await PlantsService.getPlantsTable(page,place,author);
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

  const getFilters = async() => {
   const users = await UserService.getAllUsers()
   setUsers(users)
   const places = await PlacesServices.getAllPlaces()
   setPlaces(places)
  }
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
  const handleUserFilter = (id:string)=>{
    setCurrentUser(id)
    getDataTable((tableResponse as any).page,currentPlace,id)
  }
  const handlePlaceFilter = (id:string) =>{
    setCurrentPLace(id)
    getDataTable((tableResponse as any).page,id,curentUser)
  }
  return (
    <div>
      <Row style={{marginBottom:'1rem'}}>
        <Col md={6}>
          <Select placeholder='Usuarios' defaultValue='' onChange={handleUserFilter} style={{width:'90%'}}>
          <Select.Option   value={''}>All Users</Select.Option>
            {users.map((user, index) => (
              <Select.Option key={index}  value={user._id}>{user.firstName+''+user.lastName}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col md={6}>
          {" "}
          <Select placeholder='Lugares' defaultValue='' onChange={handlePlaceFilter} style={{width:'90%'}}>
          <Select.Option   value={''}>All Places</Select.Option>
            {places.map((place, index) => (
              <Select.Option key={index} value={place._id}>{place.name}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Table
      style={{marginTop:'1rem'}}
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
              link.download = id + ".png";
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
