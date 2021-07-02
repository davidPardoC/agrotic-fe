import React, { useEffect } from "react";
import { UserService } from "../../../services/user-service";
import { Form, Input, Button, Divider } from "antd";
export const Profile = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const userProfile = await UserService.getUserProfile();
    if (userProfile) {
      console.log(userProfile);
      form.setFieldsValue({firstName:userProfile.firstName})
      form.setFieldsValue({lastName:userProfile.lastName})
      form.setFieldsValue({email:userProfile.email})
    }
  };
  return (
    <div style={{ width: "25%" }}>
      <Form form={form} layout="vertical" onFinish={()=>{}}>
        <Form.Item label="Nombre" name="firstName" rules={[{len:4}, {}]}>
          <Input />
        </Form.Item>
        <Form.Item label="Apellido" name="lastName" rules={[{len:4}]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email"  rules={[{len:6}]}>
          <Input type='email'/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" >Actualizar</Button>
        </Form.Item>
      </Form>
      <Divider />
      <Form layout="vertical">
        <Form.Item label="Contraseña Anterior" name="password">
          <Input />
        </Form.Item>
        <Form.Item label="Nueva Contraseña" name="newPassword">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Actualizar Contraseña</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
