import { Layout } from "antd";

const Main = () => {
  const { Content } = Layout;
  
  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        Bill is a cat.
      </div>
    </Content>
  );
};

export default Main;
