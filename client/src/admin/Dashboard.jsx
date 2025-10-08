import React, { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Popover from "react-bootstrap/Popover";
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
    faSearch,
    faEnvelope,
    faCog,
    faSignOutAlt,
    faBell,
    faBars, // mobile toggle
    faAngleDoubleLeft // collapse/expand for desktop
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope as faEnvelopeRegular, faBell as faBellRegular } from "@fortawesome/free-regular-svg-icons";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminPopover from "./component/Popover";
import "./dashboard.css";
import { supabase } from "../supabaseClient";

function Dashboard() {
    const { user } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);  // desktop collapse
    const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile open/close
    const [isSearchOpen, setIsSearchOpen] = useState(false);// search bar toggle


    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);
    const closeMobileSidebar = () => setIsMobileOpen(false);
    const handleLogout = async () => {
        // Add your logout logic 
        
       
    };
    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar d-flex flex-column p-2 shadow-sm gap-4 
                ${isCollapsed ? "collapsed" : ""} 
                ${isMobileOpen ? "mobile-active" : ""}`}
            >
                <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                    {!isCollapsed && <img src="" alt="logo" className="logo_img" />}

                    {/* Collapse button (desktop only) */}
                    <FontAwesomeIcon
                        icon={isCollapsed ? faBars : faAngleDoubleLeft}
                        onClick={toggleSidebar}
                        className="toggle-btn d-none d-md-block"
                    />

                    {/* Close button (mobile only) */}
                    <FontAwesomeIcon
                        icon={faAngleDoubleLeft}
                        onClick={closeMobileSidebar}
                        className="toggle-btn d-md-none"
                    />
                </div>

                <div className="side-con border-0">
                    <ul className="nav flex-column">
                        <li className="nav-item mb-1">
                            <NavLink
                                to="" end
                                className={({ isActive }) =>
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                                onClick={closeMobileSidebar}
                            >
                                <FontAwesomeIcon icon={faGrip} className="me-3" />
                                {!isCollapsed && "Dashboard"}
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink
                                to="teachers"
                                className={({ isActive }) =>
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                                onClick={closeMobileSidebar}
                            >
                                <FontAwesomeIcon icon={faChalkboardTeacher} className="me-3" />
                                {!isCollapsed && "Teachers"}
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink
                                to="student"
                                className={({ isActive }) =>
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                                onClick={closeMobileSidebar}
                            >
                                <FontAwesomeIcon icon={faUserGraduate} className="me-3" />
                                {!isCollapsed && "Students"}
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink
                                to="attendance"
                                className={({ isActive }) =>
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                                onClick={closeMobileSidebar}
                            >
                                <FontAwesomeIcon icon={faClipboardList} className="me-3" />
                                {!isCollapsed && "Attendance"}
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink
                                to="time_table"
                                className={({ isActive }) =>
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                                onClick={closeMobileSidebar}
                            >
                                <FontAwesomeIcon icon={faCalendarAlt} className="me-3" />
                                {!isCollapsed && "Time Table"}
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink
                                to="report"
                                className={({ isActive }) =>
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                                onClick={closeMobileSidebar}
                            >
                                <FontAwesomeIcon icon={faChartBar} className="me-3" />
                                {!isCollapsed && "Reports"}
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink
                                to="assessment"
                                className={({ isActive }) =>
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                                onClick={closeMobileSidebar}
                            >
                                <FontAwesomeIcon icon={faTasks} className="me-3" />
                                {!isCollapsed && "Assessment"}
                            </NavLink>
                        </li>
                        <li className="nav-item mb-2">
                            <NavLink
                                to="messages"
                                className={({ isActive }) =>
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                                onClick={closeMobileSidebar}
                            >
                                <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                                {!isCollapsed && "Messages"}
                            </NavLink>
                        </li>
                        <li className="nav-item mb-1">
                            <NavLink
                                to="settings"
                                className={({ isActive }) =>
                                    "nav-link sidebar-link " + (isActive ? "active-link" : "")
                                }
                                onClick={closeMobileSidebar}
                            >
                                <FontAwesomeIcon icon={faCog} className="me-3" />
                                {!isCollapsed && "Settings"}
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="logout-con nav mt-auto">
                    <li className="nav-item mb-2">
                       <button
        className="nav-link sidebar-link"
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="me-3" />
        {!isCollapsed && 'Logout'}
      </button>
                    </li>
                </div>
            </div>

            {/* Overlay for mobile */}
            <div
                className={`sidebar-overlay ${isMobileOpen ? "active" : ""}`}
                onClick={closeMobileSidebar}
            ></div>

            {/* Main Section */}
            <div className={`main-content d-flex flex-column ${isCollapsed ? "expanded" : ""}`}>
                <div className="d-flex justify-content-between align-items-center p-3 header">
                    {/* Mobile Hamburger */}
                    <button className="hamburger-btn d-md-none" onClick={toggleMobileSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <div className="topnav d-flex align-items-center">
                        <h5 className="m-0 me-3 d-none d-md-block">Welcome , Admin</h5>

                        {/* Search Form */}
                        <form className={`search-form ${isSearchOpen ? "active" : ""}`} onSubmit={(e) => e.preventDefault()}>
                            <input type="search" placeholder="Search..." />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="search-icon"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                            />
                        </form>
                    </div>

                    <div className="admin_pic_box d-flex align-items-center gap-3">
                        <span className="notification"><FontAwesomeIcon icon={faBellRegular} /></span>
                        <span className="message"><FontAwesomeIcon icon={faEnvelopeRegular} /></span>
                        <AdminPopover user={user} />
                        <div className="admin_name d-none d-md-flex ">
                        </div>
                    </div>
                </div>


                {/* Content */}
                <div className="content-area flex-grow-1 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


