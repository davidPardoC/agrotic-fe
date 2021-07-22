import {
  DashboardOutlined,
  EnvironmentOutlined,
  PictureOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { FC } from "react";

const iconStyle = { fontSize: "1.3rem" };

type Props = {
  sidebarState: boolean;
  switchTab: (route: string) => void;
};

export const Sidebar = ({ sidebarState, switchTab }: Props) => {
  return (
    <div style={{ width: "auto", height:'max-content'}}>
      <Menu
        defaultSelectedKeys={["2"]}
        style={{ height: "92.6vh"}}
        mode="inline"
        theme="dark"
        inlineCollapsed={sidebarState}
      >
        <Menu.Item
          key={1}
          onClick={() => {
            switchTab("dashboard");
          }}
          icon={<DashboardOutlined style={iconStyle} />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key={2}
          onClick={() => {
            switchTab("plants");
          }}
          icon={<PictureOutlined style={iconStyle} />}
        >
          Plantas
        </Menu.Item>
        <Menu.Item
          key={3}
          onClick={() => {
            switchTab("places");
          }}
          icon={<EnvironmentOutlined  style={iconStyle} />}
        >
          Lugares
        </Menu.Item>
        <Menu.Item
          key={4}
          onClick={() => {
            switchTab("settings");
          }}
          icon={<SettingOutlined style={iconStyle} />}
        >
          Configuraciones
        </Menu.Item>
      </Menu>
    </div>
  );
};
