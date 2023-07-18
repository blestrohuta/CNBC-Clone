import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";
import FooterComp from "./components/FooterComp";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <FooterComp />
    </>
  );
}

export default App;
