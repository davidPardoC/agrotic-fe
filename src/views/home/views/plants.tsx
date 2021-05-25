import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { PlantForm } from "../../../components/plants/plant-form/plant-form";
import { PlantsTable } from "../../../components/plants/table/plantstable";

export const Plants = () => {
  useEffect(() => {
    console.log("Mounted");
    return () => {
      console.log("UnMounted");
    };
  }, []);
  const [showPlantModal, setShowPlantModal] = useState<boolean>(false);
  const [itemToUpdate, setItemToUpdate] = useState<string>("");
  const [isAddedPlant, setIsAddedPlant] = useState<any>({});

  const togglePlantModal = () => {
    setItemToUpdate("");
    setShowPlantModal(!showPlantModal);
  };
  const openUpdateModal = (id: string) => {
    setItemToUpdate(id);
    setShowPlantModal(true);
  };
  const hideModal = () => {
    setShowPlantModal(false);
  };
  return (
    <div>
      <Modal
        style={{ top: 20 }}
        destroyOnClose={true}
        width={"60%"}
        footer={[]}
        visible={showPlantModal}
        onCancel={() => {
          setShowPlantModal(false);
        }}
      >
        <PlantForm
          hideModal={hideModal}
          setIsAddedPlant={setIsAddedPlant}
          itemToUpdate={itemToUpdate}
        />
      </Modal>
      <Button
        shape="round"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          togglePlantModal();
        }}
      >
        Agregar Planta
      </Button>
      <br />
      <br />
      <PlantsTable
        openUpdateModal={openUpdateModal}
        isAddedPlant={isAddedPlant}
      />
    </div>
  );
};
