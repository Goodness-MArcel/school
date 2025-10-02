import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faGrip,
  faBoxOpen,
  faChalkboardTeacher,
  faUserGraduate,
  faClipboardList,
  faCalendarAlt,
  faChartBar,
  faTasks,
  faEnvelope,
  faCog,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./dashboard.css";

function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar d-flex flex-column p-2 shadow-sm gap-4">
                <div className="side-con border">
                    <img src="" alt="" className="logo_img"/>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-1">
                            <NavLink 
                                to="" 
                                end
                                className={({ isActive }) => 
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                            >
                                <FontAwesomeIcon icon={faGrip} className="me-3"/>
                                Dashboard
                            </NavLink>
                        </li>
                     
                        <li className="nav-item mb-1">
                            <NavLink 
                                to="teachers" 
                                className={({ isActive }) => 
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                            >
                                <FontAwesomeIcon icon={faChalkboardTeacher} className="me-3"/>
                                Teachers
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink 
                                to="student" 
                                className={({ isActive }) => 
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                            >
                                <FontAwesomeIcon icon={faUserGraduate} className="me-3"/>
                                Students
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink 
                                to="attendance" 
                                className={({ isActive }) => 
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                            >
                                <FontAwesomeIcon icon={faClipboardList} className="me-3"/>
                                Attendance
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink 
                                to="time_table" 
                                className={({ isActive }) => 
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                            >
                                <FontAwesomeIcon icon={faCalendarAlt} className="me-3"/>
                                Time Table
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink 
                                to="report" 
                                className={({ isActive }) => 
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                            >
                                <FontAwesomeIcon icon={faChartBar} className="me-3"/>
                                Reports
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink 
                                to="assessment" 
                                className={({ isActive }) => 
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                            >
                                <FontAwesomeIcon icon={faTasks} className="me-3"/>
                                Assessment
                            </NavLink>
                        </li>
                        <li className="nav-item mb-2">
                            <NavLink 
                                to="messages" 
                                className={({ isActive }) => 
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                            >
                                <FontAwesomeIcon icon={faEnvelope} className="me-3"/>
                                Messages
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink 
                                to="settings" 
                                className={({ isActive }) => 
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                            >
                                <FontAwesomeIcon icon={faCog} className="me-3"/>
                                Settings
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="logout-con nav">
                    <li className="nav-item mb-2">
                        <NavLink 
                            to="logout" 
                            className={({ isActive }) => 
                                "nav-link sidebar-link " + (isActive ? "active-link" : "")
                            }
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="me-3"/>
                            Logout
                        </NavLink>
                    </li>
                </div>
            </div>

            {/* Main Section */}
            <div className="main-content d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center p-3 header">
                    <h5 className="m-0">Welcome , Admin</h5>
                    <span>{user?.email || "Guest"}</span>
                </div>

                {/* This is where subpages render */}
                <div className="content-area flex-grow-1 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
