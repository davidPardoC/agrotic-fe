import { Form, Input, Button, Radio } from "antd";
import { PlacesServices } from "../../../services/places-service";

export const AddPlace = ({ closeModal }: any) => {
  const createPlace = async (values: any) => {
    const formatedValues = { ...values };
    if(values.coordenates) formatedValues.coordenates = values.coordenates.split(",");
    const place = await PlacesServices.createPlace(formatedValues);
    if (place) {
      closeModal();
    }
  };
  return (
    <div>
      <Form layout="vertical" onFinish={createPlace}>
        <Form.Item label="Nombre" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Descripcion" name="desc">
          <Input />
        </Form.Item>
        <Form.Item
          label="Coordenadas"
          name="coordenates"
          rules={[
            { required: false },
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.resolve()
                } else {
                  if (value.split(",").length === 2) {
                    if (value.split(",")[1]) {
                      return Promise.resolve();
                    }
                    {
                      return Promise.reject("Fomato Incorrecto");
                    }
                  } else {
                    return Promise.reject("Fomato Incorrecto");
                  }
                }
              },
            },
          ]}
        >
          <Input placeholder="Ejm: 1232, 3453 (longitud, latitud)" />
        </Form.Item>
        <Form.Item>
          <Button
            onClick={() => {
              closeModal();
            }}
          >
            Cancelar
          </Button>
          <Button style={{ marginLeft: 10 }} type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
