import { Button, Col, Input, Row } from "antd";
import { Form } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthService } from "../../services/auth-service";
import { FormWrapper } from "./styles/styleComponents";
import { RegisterForm } from "./types";
import wave from '../../assets/wave.svg'

export const Register = () => {
  const [password, setPassword] = useState<string>("");
  const registerUser = async (value: RegisterForm) => {
    const { email, firstName, lastName, password } = value;
    await AuthService.registerUser({ email, firstName, lastName, password });
  };
  const BackGroudWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
  `;

  return (
    <Row>
      <BackGroudWrapper>
        <img
          src={wave}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </BackGroudWrapper>
      <Col span={6} offset={9}>
        <FormWrapper>
          <Form layout={"vertical"} onFinish={registerUser}>
            <h1 style={{textAlign:'center'}}>Registro</h1>
            <Form.Item
              label="Correo Electrónico"
              name="email"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Nombres:"
              name="firstName"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Apellidos:"
              name="lastName"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Contraseña:"
              name="password"
              rules={[
                { required: true, message: "Campo requerido" },
                { min: 6, message: "Minimo 6 caracteres" },
              ]}
            >
              <Input.Password
                onInput={(e) => {
                  setPassword((e.target as any).value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Confirmar Contraseña:"
              name="confPassword"
              rules={[
                { required: true, message: "Campo requerido" },
                {
                  validator: (_, value) =>
                    value === password
                      ? Promise.resolve()
                      : Promise.reject("Las contraseñas no coinciden"),
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Registrarse
              </Button>
            </Form.Item>
            <Link to="/signin">Iniciar Sesion</Link>
          </Form>
        </FormWrapper>
      </Col>
    </Row>
  );
};
