import { Layout } from 'antd';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Main from "./Main";
import SiteFooter from "./SiteFooter";

const App = () => {

  return (
    <Layout  style={{ minHeight: "100vh" }}>
      
      <Sidebar />

      <Layout className="site-layout">

        <Navbar />

        <Main />

        <SiteFooter />

      </Layout>
    </Layout>
  );
};

export default App;
