import { Layout, Menu } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { machineEvents } from "../statecharts/machine";

const Navbar = () => {
  const { Header } = Layout;
  const { current, sendEvent } = useContext(AuthContext);
  const { isLoggedIn } = current.context;
  const handleLoginLogoutClick = () => {
    sendEvent(isLoggedIn ? machineEvents.LOGOUT : machineEvents.GOTO_LOGIN);
  }

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Menu style={{ textAlign: "right" }} theme="dark" mode="horizontal">
        <Menu.Item key="1" onClick={handleLoginLogoutClick}>{isLoggedIn ? "Logout" : "Login"}</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">Contact</Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
