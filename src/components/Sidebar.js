import { Layout, Menu } from "antd";
import { useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
const Sidebar = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
    <div className="logo" style={{height: '64px', color: '#fff', fontWeight: 700, fontSize: 24, textAlign: "center"}}>SalesTracker</div>
    <Menu theme="light" mode="inline">
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        Today
      </Menu.Item>
      <Menu.Item key="2" icon={<PieChartOutlined />}>
        This Month
      </Menu.Item>
      <Menu.Item key="3" icon={<PieChartOutlined />}>
        Lifetime
      </Menu.Item>      
    </Menu>
  </Sider>

  );
};

export default Sidebar;
