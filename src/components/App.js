import { Layout } from 'antd';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Main from "./Main";
import SiteFooter from "./SiteFooter";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const App = () => {

  const { current } = useContext(AuthContext);
  const { isLoggedIn } = current.context;

  return (
    <Layout  style={{ minHeight: "100vh" }}>
      
      {isLoggedIn &&<Sidebar />}

      <Layout className="site-layout">

        <Navbar />

        <Main />

        <SiteFooter />

      </Layout>
    </Layout>
  );
};

export default App;
