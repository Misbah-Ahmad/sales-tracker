import { Layout } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import LoginForm from "./LoginForm";

const Main = () => {
  const { Content } = Layout;

  const { current } = useContext(AuthContext);
  const { isLoggedIn } = current.context;
  const isLoading = current.matches("LOGGING_IN");

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: '24 px', minHeight: 360 }}
      >

        {!isLoggedIn && (current.matches("LOGIN_PAGE") || current.matches("LOGGING_IN")) && <LoginForm isLoading={isLoading} />}

        {isLoggedIn && current.matches("DASHBOARD") && <Dashboard/>}
      </div>
    </Content>
  );
};

export default Main;
