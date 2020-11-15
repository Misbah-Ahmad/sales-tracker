import App from "./components/App";
import AuthContextProvider from "./contexts/AuthContext";

const Home = () => {
  return (
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
  );
};

export default Home;
