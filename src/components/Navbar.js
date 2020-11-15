import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";


const Navbar = () => {
  return (
    <Header className="header">
      <div className="logo" style={{ color: "#fff" }} />
      <Menu style={{ textAlign: "right" }} theme="dark" mode="horizontal">
        <Menu.Item key="1">Login</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">Contact</Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
