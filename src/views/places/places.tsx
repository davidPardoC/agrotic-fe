import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { AddPlace } from "./AddPlace/AddPlace";
import { PlacesTable } from "./Table/table";

export const Places = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Button icon={<PlusOutlined />} shape="round" type="primary" onClick={()=>{ setShowModal(!showModal)}}>
        Agregar Lugar
      </Button>
      <PlacesTable refresh={showModal}/>
      <Modal destroyOnClose={true} width='50%' visible={showModal} onCancel={()=>{setShowModal(false)}} footer=''>
          <AddPlace closeModal={()=>{setShowModal(false)}}/>
      </Modal>
    </div>
  );
};
