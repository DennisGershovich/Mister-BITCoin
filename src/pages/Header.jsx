import { useContext } from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes.js";
import { AppContext } from "../App";
import { userService } from "../services/userService";

export const Header = () => {
  const logedUser = useContext(AppContext);
  const { name } = userService.getUser();
  return (
    <header className="header">
      <nav className="nav-bar">
        {routes.map((route) => (
          <NavLink to={route.path} key={route.path} className="nav-bar-item">
            {" "}
            {route.label}{" "}
          </NavLink>
        ))}
        <div className="logedIn-user">
          <button onClick={() => logedUser.logOut()}>log out </button>
          <h4>{name}</h4>
        </div>
      </nav>
    </header>
  );
};
