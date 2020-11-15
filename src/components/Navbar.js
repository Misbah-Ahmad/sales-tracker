import { Layout, Menu } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { Header } = Layout;
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Menu style={{ textAlign: "right" }} theme="dark" mode="horizontal">
        <Menu.Item key="1">{isLoggedIn ? "Logout" : "Login"}</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">Contact</Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
