import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
        <i className="fas fa-user-secret me-2"></i>CNBC
      </div>
      <div className="list-group list-group-flush my-3">
        <NavLink
          to="/"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fas fa-project-diagram me-2"></i>Posts
        </NavLink>
        <NavLink
          to="/categories"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fas fa-chart-line me-2"></i>Categories
        </NavLink>
        <NavLink
          to="/register"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <i className="fas fa-shopping-cart me-2"></i>Register
        </NavLink>
        <NavLink
          to="/logout"
          className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
          onClick={handleClick}
        >
          <i className="fas fa-power-off me-2"></i>Logout
        </NavLink>
      </div>
    </div>
  );
}
