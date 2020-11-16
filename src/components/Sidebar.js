import { Layout, Menu } from "antd";
import { useContext, useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import { machineEvents } from "../statecharts/machine";
import { AuthContext } from "../contexts/AuthContext";
const Sidebar = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const { sendEvent } = useContext(AuthContext);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <div
        className="logo"
        style={{
          height: "64px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 24,
          textAlign: "center",
        }}
      >
        SalesTracker
      </div>
      <Menu theme="light" mode="inline">
        <Menu.Item
          onClick={() => sendEvent(machineEvents.SEE_TODAY_REPORT)}
          key="1"
          icon={<PieChartOutlined />}
        >
          Today
        </Menu.Item>
        <Menu.Item key="2" icon={<PieChartOutlined />}>
          This Month
        </Menu.Item>
        <Menu.Item key="3" icon={<PieChartOutlined />}>
          Lifetime
        </Menu.Item>
        <Menu.Item
          onClick={() => sendEvent(machineEvents.ENTER_NEW_SALE)}
          key="4"
          icon={<PieChartOutlined />}
        >
          +New Sale
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
