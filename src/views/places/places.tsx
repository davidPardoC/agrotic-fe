import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { AddPlace } from "./AddPlace/AddPlace";
import { PlacesTable } from "./Table/table";

export const Places = () => {
  const [showModal, setShowModal] = useState(false);
  const [refreshTableFlag, setRefreshTable] = useState(true)
  const refreshTable = (value:boolean)=>{
    setRefreshTable(value)
  }
  return (
    <div>
      <Button icon={<PlusOutlined />} shape="round" type="primary" onClick={()=>{ setShowModal(!showModal)}}>
        Agregar Lugar
      </Button>
      <PlacesTable refreshTable={refreshTable} refreshTableFlag={refreshTableFlag}/>
      <Modal destroyOnClose={true} width='50%' visible={showModal} onCancel={()=>{setShowModal(false)}} footer=''>
          <AddPlace refreshTable={refreshTable} closeModal={()=>{setShowModal(false)}}/>
      </Modal>
    </div>
  );
};
