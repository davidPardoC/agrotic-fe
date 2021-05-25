import { Col, Input, Row, Form, Button } from "antd";
import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import { AuthService } from "../../services/auth-service";
import wave from '../../assets/wave.svg'
const LoginCard = styled.div`
  width: 100%;
  box-shadow: 1px 1px 5px black;
  border-radius: 4px;
  padding: 2rem;
  margin-top: 20vh;
  background-color: white;
`;

const TitleCard = styled.h2`
  text-align: center;
`;

const BackGroudWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;
export const Login = () => {
  const { setToken, setUser } = useContext(AuthContext);

  const onFinish = async (values: { email: string; password: string }) => {
    const token = await AuthService.login(values.email, values.password);
    setToken(token);
    setUser(jwtDecode(token));
  };

  return (
    <>
      <BackGroudWrapper>
        <img src={wave} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
      </BackGroudWrapper>

      <Row>
        <Col span={6} offset={9}>
          <LoginCard>
            <TitleCard>Iniciar Sesion</TitleCard>
            <Form layout={"vertical"} onFinish={onFinish}>
              <Form.Item
                label="Correo Electrónico"
                name="email"
                rules={[{ required: true, message: "Campo requerido" }]}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                label="Contraseña:"
                name="password"
                rules={[{ required: true, message: "Campo requerido" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Iniciar Sesion
                </Button>
              </Form.Item>
              <Link to="/signup">Registrar</Link>
            </Form>
          </LoginCard>
        </Col>
      </Row>
    </>
  );
};
