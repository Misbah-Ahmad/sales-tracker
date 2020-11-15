import { Layout } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import LoginForm from "./LoginForm";

const Main = () => {
  const { Content } = Layout;

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: '24 px', minHeight: 360 }}
      >

        {!isLoggedIn && <LoginForm />}

        {isLoggedIn && <Dashboard/>}
      </div>
    </Content>
  );
};

export default Main;
