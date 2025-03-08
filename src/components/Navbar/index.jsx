import React, { useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./top-nav.scss";
import "./side-nav.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEnvelope,
  faGear,
  faEllipsisVertical,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../../images/logo.png";
import { useGlobalContext } from "../../context";

const Navbar = ({ toggleClass, setUser }) => {
  const [rightNavDisplay, setRightNavDisplay] = useState(false);
  const refnavcontainer = useRef(null);

  const { userType, username, userDashboardURL, name } = useGlobalContext();

  const toggleNavClass = () => {
    const element = refnavcontainer.current;
    const withHideNav = "sidebar__wrapper hide__nav";
    const withOutHideNav = "sidebar__wrapper";

    if (element.className === withHideNav) {
      element.className = withOutHideNav;
    } else if (element.className === withOutHideNav) {
      element.className = withHideNav;
    }
  };

  const navHideShow = () => {
    toggleClass();
    toggleNavClass();
  };

  const navHideOnSm = () => {
    if (window.innerWidth <= 992) {
      navHideShow();
    }
  };

  const logout = () => {
    setUser("");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  };

  const reloadFunc = (n) => {
    setTimeout(() => {
      window.location.reload();
    }, n);
  };

  return (
    <>
      {/* <div className="nav__wrapper">
        <div className="nav__inner__wrapper px-3">
          <div className="nav__left">
            <FontAwesomeIcon
              onClick={navHideShow}
              icon={faBars}
              className="hum__icon"
            />
            {userType === "client" ? (
              <NavLink to={userDashboardURL}>
                <img className="main__logo" src={logo} alt="" />
              </NavLink>
            ) : (
              <NavLink to="/" onClick={() => reloadFunc(200)}>
                <img className="main__logo" src={logo} alt="" />
              </NavLink>
            )}
          </div>
          <div
            className={
              rightNavDisplay ? "nav__right " : "nav__right nav__right__toggle"
            }
          >
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                {username || "User"}
              </button>
              <ul className="dropdown-menu dropdown-menu-lg-end shadow">
                <li>
                  <a onClick={logout} className="dropdown-item">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="dot__container">
            <FontAwesomeIcon
              onClick={() => {
                setRightNavDisplay(true);
              }}
              icon={faEllipsisVertical}
              className="fs-5"
            />
          </div>
        </div>
      </div> */}
      <div ref={refnavcontainer} className="sidebar__wrapper">
        <div>
          <div>
            {userType === "client" ? (
              <NavLink to={userDashboardURL}>
                <img className="main__logo" src={logo} alt="" />
              </NavLink>
            ) : (
              <NavLink to="/" onClick={() => reloadFunc(200)}>
                <img className="main__logo" src={logo} alt="" />
              </NavLink>
            )}
          </div>
          <div className="username_txt">{ username || "User"}</div>
        </div>
        {userType === "client" ? (
          <div className="sidebar__inner__wrapper">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <NavLink
                    to={userDashboardURL}
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3 rounded-0"
                        : "accordion-button px-3 rounded-0"
                    }
                    onClick={() => {
                      navHideOnSm();
                    }}
                  >
                    Dashboard
                  </NavLink>
                </h2>
              </div>

              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <NavLink
                    to="/offlineAlerts"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3 rounded-0"
                        : "accordion-button px-3 rounded-0"
                    }
                    onClick={navHideOnSm}
                  >
                    Offline alerts
                  </NavLink>
                </h2>
              </div>

              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <NavLink
                    to="/delayAlerts"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3 rounded-0"
                        : "accordion-button px-3 rounded-0"
                    }
                    onClick={navHideOnSm}
                  >
                    Delay alerts
                  </NavLink>
                </h2>
              </div>

              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <NavLink
                    to="/exceededParameterAlerts"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3 rounded-0"
                        : "accordion-button px-3 rounded-0"
                    }
                    onClick={navHideOnSm}
                  >
                    Parameter exceeded alerts
                  </NavLink>
                </h2>
              </div>

              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <NavLink
                    to="/deceedParameterAlerts"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3 rounded-0"
                        : "accordion-button px-3 rounded-0"
                    }
                    onClick={navHideOnSm}
                  >
                    Parameter deceeded alerts
                  </NavLink>
                </h2>
              </div>

              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <a
                    // to={userDashboardURL}
                    className={"accordion-button px-3 rounded-0"}
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </a>
                </h2>
              </div>
            </div>
          </div>
        ) : userType === "partner" ? (
          <div className="sidebar__inner__wrapper">
            <div className="accordion" id="accordionExample">
              {userType === "admin" ||
              userType === "serviceengineer" ||
              userType === "partner" ? (
                <div className="accordion-item border-0">
                  <h2 className="accordion-header">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "active accordion-button px-3 rounded-0"
                          : "accordion-button px-3 rounded-0"
                      }
                      onClick={() => {
                        navHideOnSm();
                        reloadFunc(200);
                      }}
                    >
                      Dashboard
                    </NavLink>
                  </h2>
                </div>
              ) : (
                <></>
              )}

              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <NavLink
                    to="/offlineAlerts"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3 rounded-0"
                        : "accordion-button px-3 rounded-0"
                    }
                    onClick={navHideOnSm}
                  >
                    Offline alerts
                  </NavLink>
                </h2>
              </div>

              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <NavLink
                    to="/delayAlerts"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3 rounded-0"
                        : "accordion-button px-3 rounded-0"
                    }
                    onClick={navHideOnSm}
                  >
                    Delay alerts
                  </NavLink>
                </h2>
              </div>

              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <NavLink
                    to="/exceededParameterAlerts"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3 rounded-0"
                        : "accordion-button px-3 rounded-0"
                    }
                    onClick={navHideOnSm}
                  >
                    Parameter exceeded alerts
                  </NavLink>
                </h2>
              </div>

              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <NavLink
                    to="/deceedParameterAlerts"
                    className={({ isActive }) =>
                      isActive
                        ? "active accordion-button px-3 rounded-0"
                        : "accordion-button px-3 rounded-0"
                    }
                    onClick={navHideOnSm}
                  >
                    Parameter deceeded alerts
                  </NavLink>
                </h2>
              </div>

              <div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <a
                    // to={userDashboardURL}
                    className={"accordion-button px-3 rounded-0"}
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </a>
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="sidebar__inner__wrapper">
            <div className="accordion" id="accordionExample">
              {userType === "admin" ||
              userType === "serviceengineer" ||
              userType === "partner" ? (
                <div className="accordion-item border-0">
                  <h2 className="accordion-header">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "active accordion-button px-3 rounded-0"
                          : "accordion-button px-3 rounded-0"
                      }
                      onClick={() => {
                        navHideOnSm();
                        reloadFunc(200);
                      }}
                    >
                      Dashboard
                    </NavLink>
                  </h2>
                </div>
              ) : (
                <></>
              )}
              {userType === "admin" ? (
                <>
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header">
                      <NavLink
                        to="/parameters"
                        className={({ isActive }) =>
                          isActive
                            ? "active accordion-button px-3 rounded-0"
                            : "accordion-button px-3 rounded-0"
                        }
                        onClick={navHideOnSm}
                      >
                        Parameters
                      </NavLink>
                    </h2>
                  </div>
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header">
                      <NavLink
                        to="/partners"
                        className={({ isActive }) =>
                          isActive
                            ? "active accordion-button px-3 rounded-0"
                            : "accordion-button px-3 rounded-0"
                        }
                        onClick={navHideOnSm}
                      >
                        Partners
                      </NavLink>
                    </h2>
                  </div>
                </>
              ) : (
                <></>
              )}
              {userType === "admin" || userType === "serviceengineer" ? (
                <>
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header">
                      <NavLink
                        to="/rawDataListing"
                        className={({ isActive }) =>
                          isActive
                            ? "active accordion-button px-3 rounded-0"
                            : "accordion-button px-3 rounded-0"
                        }
                        onClick={navHideOnSm}
                      >
                        Raw Data Listing
                      </NavLink>
                    </h2>
                  </div>
                </>
              ) : (
                <></>
              )}
              {userType === "admin" ? (
                <div className="accordion-item border-0">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed px-3"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      <h2 className="fs-6 m-0">Configure</h2>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body p-0">
                      <NavLink
                        to="/industry"
                        className={({ isActive }) =>
                          isActive
                            ? "active accordion-button px-3 rounded-0"
                            : "accordion-button px-3 rounded-0"
                        }
                        onClick={navHideOnSm}
                      >
                        Industry
                      </NavLink>
                      <NavLink
                        to="/location"
                        className={({ isActive }) =>
                          isActive
                            ? "active accordion-button px-3 rounded-0"
                            : "accordion-button px-3 rounded-0"
                        }
                        onClick={navHideOnSm}
                      >
                        Location
                      </NavLink>
                      <NavLink
                        to="/devices"
                        className={({ isActive }) =>
                          isActive
                            ? "active accordion-button px-3 rounded-0"
                            : "accordion-button px-3 rounded-0"
                        }
                        onClick={navHideOnSm}
                      >
                        Device
                      </NavLink>
                      <NavLink
                        to="/datasettings"
                        className={({ isActive }) =>
                          isActive
                            ? "active accordion-button px-3 rounded-0"
                            : "accordion-button px-3 rounded-0"
                        }
                        onClick={navHideOnSm}
                      >
                        Data Settings
                      </NavLink>
                      <NavLink
                        to="/people"
                        className={({ isActive }) =>
                          isActive
                            ? "active accordion-button px-3 rounded-0"
                            : "accordion-button px-3 rounded-0"
                        }
                        onClick={navHideOnSm}
                      >
                        People
                      </NavLink>
                      <NavLink
                        to="/cameraconfig"
                        className={({ isActive }) =>
                          isActive
                            ? "active accordion-button px-3 rounded-0"
                            : "accordion-button px-3 rounded-0"
                        }
                        onClick={navHideOnSm}
                      >
                        Camera
                      </NavLink>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {userType === "admin" ? (
                <div className="accordion-item border-0">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed px-3"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <h2 className="fs-6 m-0">Settings</h2>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body p-0">
                      <NavLink
                        to="/closeIndustry"
                        className={({ isActive }) =>
                          isActive
                            ? "active accordion-button px-3 rounded-0"
                            : "accordion-button px-3 rounded-0"
                        }
                        onClick={navHideOnSm}
                      >
                        Close Industry
                      </NavLink>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

<div className="accordion-item border-0">
                <h2 className="accordion-header">
                  <a
                    // to={userDashboardURL}
                    className={"accordion-button px-3 rounded-0"}
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </a>
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
