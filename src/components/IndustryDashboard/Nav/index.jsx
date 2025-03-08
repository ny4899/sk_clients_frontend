import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
const Nav = () => {
  const { industry_name } = useParams();
  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "nav-link"
            }
            to={`/${industry_name}`}
          >
            Graph
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "nav-link"
            }
            to={`/map/${industry_name}`}
          >
            Map
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "nav-link"
            }
            to={`/camera/${industry_name}`}
          >
            Camera
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Nav;
