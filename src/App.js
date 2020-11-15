import { Layout } from "antd";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import SiteFooter from "./components/SiteFooter";

const App = () => {
  const { Content } = Layout;


  return (
    <Layout>
      <Navbar />
      <Layout
      style={{ minHeight: '100vh' }}
      >

        <Sidebar />

        <Layout className="site-layout">

          <Content style={{ margin: '0 16px' }}>
            <Main />
          </Content>
          <SiteFooter />

        </Layout>
      </Layout>

    </Layout>
  );
};

export default App;
