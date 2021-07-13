import React, { useContext, useEffect } from "react";
import { UserService } from "../../../services/user-service";
import { Form, Input, Button, Divider } from "antd";
import { AuthContext } from "../../../context/authContext";
export const Profile = () => {
  const [form] = Form.useForm();
  const {setUser} = useContext(AuthContext)
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
  const updateProfile = async (values:any) => {
    const user = await UserService.updateProfile(values)
    setUser(user)
  }

  const updatePassword = async (values:any) => {
    await UserService.updatePassword(values)
  }
  return (
    <div style={{ width: "25%" }}>
      <Form form={form} layout="vertical" onFinish={updateProfile}>
        <Form.Item label="Nombre" name="firstName" rules={[{min:4}, {}]}>
          <Input />
        </Form.Item>
        <Form.Item label="Apellido" name="lastName" rules={[{min:4}]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email"  rules={[{min:6}]}>
          <Input type='email'/>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type="primary" >Actualizar</Button>
        </Form.Item>
      </Form>
      <Divider />
      <Form layout="vertical" onFinish={updatePassword}>
        <Form.Item label="Contraseña Anterior" name="oldPassword" required  rules={[{required:true, message:'Requerido'}]} > 
          <Input.Password />
        </Form.Item>
        <Form.Item required rules={[{min:6, message:'Mínimo 6 caracteres'}]}  label="Nueva Contraseña" name="newPassword">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type="primary">Actualizar Contraseña</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
