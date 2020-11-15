import { Layout, Menu } from "antd";
import { useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
const Sidebar = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>

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
