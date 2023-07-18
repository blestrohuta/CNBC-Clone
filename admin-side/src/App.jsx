import { Outlet } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="d-flex" id="wrapper">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default App;
