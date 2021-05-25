import { Avatar, Button, Dropdown, Menu, PageHeader } from "antd";
import styles from "./header.module.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "../../../context/authContext";

type Props = {
  sidebarState: boolean;
  setSidebarState: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({ setSidebarState, sidebarState }: Props) => {
  const { user, setToken } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const menu = () => {
    return (
      <Menu>
        <Menu.Item key="1">Configuraciones</Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            logout();
          }}
        >
          Cerrar Sesion
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <PageHeader
      className={styles.header}
      onBack={() => {
        setSidebarState(!sidebarState);
      }}
      backIcon={
        sidebarState ? (
          <MenuUnfoldOutlined style={{ fontSize: "1.5rem" }} />
        ) : (
          <MenuFoldOutlined style={{ fontSize: "1.5rem" }} />
        )
      }
      title="AgroTICS"
      extra={[
        <Dropdown key='1' overlay={menu}>
          <div>
            <a style={{ marginRight: "0.5rem" }}>
              {user.firstName} {user.lastName}
            </a>
            <Avatar
              key={1}
              className="hover"
              size={32}
              icon={<UserOutlined />}
            />
          </div>
        </Dropdown>,
      ]}
    ></PageHeader>
  );
};
