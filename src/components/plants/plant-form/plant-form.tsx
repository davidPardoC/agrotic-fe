import {
  CameraOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { PlantsService } from "../../../services/plants-service";
import { FormWrapper } from "./styled-components";

export const PlantForm = ({ itemToUpdate, setIsAddedPlant , hideModal}: any) => {
  const [previeImageSrc, setPreviewImageSrc] = useState("");
  const [fileToUpload, setFileToUpload] = useState<File>();

  const [form] = Form.useForm();
  useEffect(() => {
    if (itemToUpdate) {
      console.log(itemToUpdate);
      form.setFieldsValue({ cientificName: "Valor aleatorio" });
      form.setFieldsValue({ commonName: "Valor aleatorio" });
    }
  }, []);

  const pickImage = () => {
    const element = document.getElementById("selectPhoto");
    element?.click();
  };

  const handleImageChange = (e: File) => {
    if (e) {
      setFileToUpload(e)
      const dataUrl = URL.createObjectURL(e);
      setPreviewImageSrc(dataUrl);
    }
  };

  const registerPlant = async (values: any) => {
    const formObject = values;
    let tempArray = Object.entries(values);
    tempArray.forEach((item) => {
      if (item[1] === undefined) {
        delete formObject[item[0]];
      }
    });
    const data = await PlantsService.createPlant(formObject, fileToUpload);
    setIsAddedPlant(data);
    hideModal()
  };
  return (
    <FormWrapper>
      <Form form={form} layout="vertical" onFinish={registerPlant}>
        <Row justify="end">
          <Col md={3}>
            <Form.Item>
              <Button
                htmlType="submit"
                style={{ marginTop: "1rem" }}
                type="primary"
                size="large"
                icon={itemToUpdate ? <UploadOutlined /> : <SaveOutlined />}
              >
                {itemToUpdate ? "Actualizar" : "Guardar"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={previeImageSrc}
                style={{ width: "20%", height: "auto" }}
              />
            </div>
          </Col>
        </Row>
        <Row
          justify="center"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <Col md={4}>
            <Button
              onClick={() => {
                pickImage();
              }}
              type="primary"
              size="large"
              icon={<CameraOutlined />}
            >
              Agregar Foto
            </Button>
            
            <input
              hidden
              type="file"
              id="selectPhoto"
              onChange={(e) => {
                handleImageChange((e.target as any).files[0]);
              }}
            />
          </Col>
        </Row>
        <Row justify="space-around">
          <Col md={11} xs={24}>
            <Form.Item
              label="Nombre Comun"
              name="commonName"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Nombre Cientifico"
              name="cientificName"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Taxonomia" name="taxonomy">
              <TextArea />
            </Form.Item>
            <Form.Item label="Morfología" name="morfology">
              <TextArea />
            </Form.Item>
            <Form.Item label="Material Vegetal" name="vegetalMateria">
              <TextArea />
            </Form.Item>
            <Form.Item label="Ciclo de vida" name="lifeCycle">
              <TextArea />
            </Form.Item>
            <Form.Item label="Zona de produccion Ecuador" name="productionZone">
              <TextArea />
            </Form.Item>
            <Form.Item label="Labores de cultivo" name="cultivationWork">
              <TextArea />
            </Form.Item>
            <Form.Item label="Preparacion del terreno" name="groundPreparation">
              <TextArea />
            </Form.Item>
            <Form.Item label="Buena Asociacion" name="goodAssociation">
              <TextArea />
            </Form.Item>
            <Form.Item label="Riego" name="irrigation">
              <TextArea />
            </Form.Item>
            <Form.Item label="Control malas hiervas" name="badHerbsControl">
              <TextArea />
            </Form.Item>
            <Form.Item
              label="Recoleccion y almacenamiento"
              name="recolectionAndStore"
            >
              <TextArea />
            </Form.Item>
            <Form.Item label="Valor nutricional (100g)" name="nutritionalValue">
              <TextArea />
            </Form.Item>
          </Col>
          <Col md={11} xs={24}>
            <Form.Item label="Origen" name="origin">
              <Input />
            </Form.Item>
            <Form.Item label="Tamaño de planta" name="plantSize">
              <TextArea />
            </Form.Item>
            <Form.Item
              label="Clima en el que se produce"
              name="productionWeather"
            >
              <TextArea />
            </Form.Item>
            <Form.Item label="Temperaturas" name="temperatures">
              <TextArea />
            </Form.Item>
            <Form.Item label="Humedad" name="humidity">
              <TextArea />
            </Form.Item>
            <Form.Item label="Suelos" name="soils">
              <TextArea />
            </Form.Item>
            <Form.Item label="Epoca de siembra" name="sowingTime">
              <TextArea />
            </Form.Item>
            <Form.Item label="Semillero" name="hotBed">
              <TextArea />
            </Form.Item>
            <Form.Item label="Plantacion" name="plantation">
              <TextArea />
            </Form.Item>
            <Form.Item label="Mala Asosiacion" name="badAssociation">
              <TextArea />
            </Form.Item>
            <Form.Item label="Abonamiento y fertilizacion" name="composting">
              <TextArea />
            </Form.Item>
            <Form.Item label="Plagas y enfermedades" name="plagues">
              <TextArea />
            </Form.Item>
            <Form.Item label="Produccion promedio/ha " name="averageProduction">
              <TextArea />
            </Form.Item>
            <Form.Item label="Uso y aplicacion " name="application">
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </FormWrapper>
  );
};
