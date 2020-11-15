import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      style={{ minHeight: "100vh" }}
      collapsible
      collapsed={collapsed}
      onCollapse={() => {
        setCollapsed(!collapsed);
      }}
    >
      <div className="logo" />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<PieChartOutlined />}>
          Option 2
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
