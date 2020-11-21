import { Layout, Menu } from "antd";
import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { machineEvents } from "../statecharts/machine";
import { reportTypes } from "../statecharts/utils";
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

      <Menu defaultSelectedKeys={["1"]} theme="light" mode="inline">
      <Menu.Item
        key="5"
        style={{fontWeight: 700}}
        block="true"
          onClick={() => sendEvent(machineEvents.ENTER_NEW_SALE)}
          type="primary"
          icon={<PlusOutlined />}
          size="default"
        >
          New Sale
        </Menu.Item>
        <Menu.Item
          onClick={() => sendEvent(machineEvents.GOTO_DASHBOARD)}
          key="1"
        >
          DASHBOARD
        </Menu.Item>
        <Menu.Item
          onClick={() => sendEvent(machineEvents.SEE_REPORT, {reportType: reportTypes.TODAY})}
          key="2"
        >
          Today
        </Menu.Item>
        <Menu.Item
          onClick={() => sendEvent(machineEvents.SEE_REPORT, {reportType: reportTypes.THIS_MONTH})}
          key="3">This Month</Menu.Item>
        <Menu.Item
          onClick={() => sendEvent(machineEvents.SEE_REPORT, {reportType: reportTypes.LIFETIME})}
          key="4">Lifetime</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
