// import React from "react";
// import "./sideBar.css"
// import OverviewPage from "../page/OverviewPage";
// // import CalendarPage from "../page/calendarPage";
// import { Link, useLocation } from "react-router-dom";
// import overviewIcon from "../Assets/dasboard-icon.svg"
// import calendarIcon from "../Assets/calendar-icon.svg"
// import jobsIcon from "../Assets/jobs-icon.svg"
// import supportIcon from "../Assets/support-icon.svg"
// import sidebarIcon from "../Assets/sidebar-icon.svg"
// import logoAndText from "../Assets/logo-text.svg"
// import notificationLogo from "../Assets/notification-03.svg"
// import helpLogo from "../Assets/help-circle.svg"

// const SideBar = () => {
//     const location = useLocation();
//     let headerTitle = "";

//     if (location.pathname === "/overview") {
//         headerTitle = "Overview";
//     }
//     if (location.pathname === "/calendar") {
//         headerTitle = "Calendar";
//     }
//     if (location.pathname === "/jobs") {
//         headerTitle = "Jobs";
//     }
//     if (location.pathname === "/support") {
//         headerTitle = "Support";
//     }
//     return (
//         <div className="side_bar_header_container">
//             <div className="side_bar_container">
//                 <Link to="/overview">
//                     <div className="side_bar_child">

//                         <img src={overviewIcon} alt="" />
//                         <span>Overview</span>

//                     </div>
//                 </Link>
//                 <Link to="/calendar">
//                 <div className="side_bar_child_active">
//                     <img src={calendarIcon} alt="" />
//                     <span>Calendar</span>

//                 </div>
//                 </Link>
//                 <Link to="/jobs"> 
//                 <div className="side_bar_child">
//                     <img src={jobsIcon} alt="" />
//                     <span>Jobs</span>
//                 </div>
//                 </Link>
//                 <Link to="/support">
//                 <div className="side_bar_child">
//                     <img src={supportIcon} alt="" />
//                     <span>Support</span>
//                 </div>
//                 </Link>
//                 <div className="side_bar_bottom">
//                     <div>
//                         <img src={sidebarIcon} alt="" />
//                     </div>
//                     <div className="side_bar_bottom_text">
//                         <span>Urban Movers</span>
//                         <span>Workspace</span>
//                     </div>
//                 </div>
//             </div>
//             <div className="header_container">
//                 <div className="header_container_left">
//                     <img src={logoAndText} alt="" />
//                     <span>{headerTitle}</span>
//                 </div>
//                 <div className="header_container_right">
//                     <img src={helpLogo} alt="" />
//                     <img src={notificationLogo} alt="" />
//                 </div>
//             </div>
//             <div className="body_container">
//                 {/* <OverviewPage/> */}
//             </div>
//         </div>
//     )
// }

// export default SideBar

import React, { useState } from "react";
import "./sideBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import overviewIcon from "../Assets/dasboard-icon.svg";
import overviewIconActive from "../Assets/overview-active-icon.svg"
import calendarIcon from "../Assets/calendar-icon.svg";
import calenarIconActive from "../Assets/calendar-active-icon.svg"
import jobsIcon from "../Assets/jobs-icon.svg";
import jobsIconActive from "../Assets/jobs-active-icon.svg"
// import supportIcon from "../Assets/support-icon.svg";
// import sidebarIcon from "../Assets/sidebar-icon.svg";
import resolutionIcon from "../Assets/resolutionIcon.svg"
import resolutionIconActive from "../Assets/resolutionIconActive.svg"
import transactionIcon from "../Assets/credit-card.svg"
import transactionIconActive from "../Assets/credit-card-active.svg"
import LogoutModal from "./Logout";
// import logoAndText from "../Assets/logo-text.svg";
// import notificationLogo from "../Assets/notification-03.svg";
// import logoAndTextNew from "../Assets/new-logo-zinter-complete.svg"
// import helpLogo from "../Assets/help-circle.svg";
// import logoMobileScreen from "../Assets/logo_mobile_screen.svg"
// import hamburgerBtn from "../Assets/hamburger_btn.svg"


const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const location = useLocation();
    const navigate = useNavigate()

    const navItems = [
        { path: "/overview", icon: overviewIcon, activeIcon: overviewIconActive, label: "Overview" },
        { path: "/calendar", icon: calendarIcon, activeIcon: calenarIconActive, label: "Upcoming" },
        { path: "/jobs", icon: jobsIcon, activeIcon: jobsIconActive, label: "Jobs" },
        { path: "/payment", icon: transactionIcon, activeIcon: transactionIconActive, label: "Payment" },
        {  icon: resolutionIcon, activeIcon: resolutionIconActive, label: "Resolution" }
    ];

    const navItemsMobile = [
        { path: "/overview", icon: overviewIcon, activeIcon: overviewIconActive, label: "Overview" },
        { path: "/calendar", icon: calendarIcon, activeIcon: calenarIconActive, label: "Upcoming" },
    ];

    const showLogoutFunc = () => {
        setShowLogout(true)
    }

    const handleCancel = () => {
        setShowLogout(false);
    };

    const handleDeactivate = () => {
        setShowLogout(false);
        navigate('/vendor-login')
        sessionStorage.clear()

    };

    return (
        <div>
            <div className="side_bar_header_container">
                <div className="side_bar_container">
                    {navItems.map(({ path, icon, activeIcon, label }) => (
                        <Link key={path} to={path}>
                            <div className={`side_bar_child ${location.pathname === path ? "side_bar_child_active" : ""}`}>
                                <img src={location.pathname === path ? activeIcon : icon} alt={label} />
                                <span>{label}</span>
                            </div>
                        </Link>
                    ))}

                    <div className="side_bar_bottom">
                        <div>
                            <img src="/images/sidebar-icon.svg" alt="" />
                            {/* <img src={sidebarIcon} alt="" /> */}
                        </div>
                        <div className="side_bar_bottom_text">
                            <span>Urban Movers</span>
                            <span>Workspace</span>
                        </div>
                    </div>
                </div>
                <div className="header_container">
                    <div className="header_container_left">
                        {/* <img src={logoAndTextNew} alt="" /> */}
                        <img src="/images/new-logo-zinter-complete.svg" alt="" />
                        <span>{navItems.find(item => item.path === location.pathname)?.label || ""}</span>
                    </div>
                    <div className="header_container_right">
                        {/* <img src={helpLogo} alt="" /> */}
                        <img src="/images/help-circle.svg" alt="" />
                        {/* <img src={notificationLogo} alt="" /> */}
                        <img src="/images/notification-03.svg" alt="" />
                        <img className="logout" onClick={showLogoutFunc} src="/images/logout-03.svg" alt="" />
                    </div>
                </div>
                <div className="body_container"></div>
            </div>
            <div className="side_bar_header_mobile">
                <div className="side_bar_mobile">
                    <div onClick={toggleSidebar}>
                        {/* <img src={hamburgerBtn} alt="" /> */}
                        <img src="/images/hamburger_btn.svg" alt="" />
                    </div>
                    <div >
                        <span>{location.pathname === '/overview' ? 'Overview' : 'Upcoming'}</span>
                    </div>
                    {/* {navItems.map(({ path, icon, activeIcon, label }) => (
                            <Link key={path} to={path}>
                                <div className={`side_bar_child_mobile ${location.pathname === path ? "side_bar_child_active" : ""}`}>
                                    <img src={location.pathname === path ? activeIcon : icon} alt={label} />
                                    <span src={location.pathname === path}>{location.pathname === ''}</span>
                                </div>
                            </Link>
                        ))} */}
                    <div className="header_container_right">
                        {/* <img src={helpLogo} alt="" /> */}
                        {/* <img src="/images/help-circle.svg" alt="" /> */}

                        {/* <img src={notificationLogo} alt="" /> */}
                        {/* <img src="/images/notification-03.svg" alt="" /> */}
                        <img className="logout" onClick={showLogoutFunc} src="/images/logout-03.svg" alt="" />


                    </div>
                </div>
                {/* <div className={`side_bar_mobile_all ${isOpen ? "open" : ""}`}>
                    <div className="side_bar_container_mobile">
                        <div onClick={toggleSidebar} className="side_bar_logo_mobile">
                            <img src="/images/logo_mobile_screen.svg" alt="" />

                        </div>
                        {navItemsMobile.map(({ path, icon, activeIcon, label }) => (
                            <Link key={path} to={path}>
                                <div className={`side_bar_child_mobile ${location.pathname === path ? "side_bar_child_active" : ""}`}>
                                    <img src={location.pathname === path ? activeIcon : icon} alt={label} />
                                    <span>{label}</span>
                                </div>
                            </Link>
                        ))}

                        <div className="side_bar_bottom">
                            <div>
                                <img src="/images/sidebar-icon.svg" alt="" />
                            </div>
                            <div className="side_bar_bottom_text">
                                <span>Urban Movers</span>
                                <span>Workspace</span>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className={`side_bar_mobile_all ${isOpen ? "open" : ""}`}>
                    {/* Sidebar */}
                    <div className="side_bar_container_mobile">
                        <div onClick={toggleSidebar} className="side_bar_logo_mobile">
                            <img src="/images/new-logo-zinter-complete.svg" alt="logo" />
                        </div>

                        {navItemsMobile.map(({ path, icon, activeIcon, label }) => (
                            <Link key={path} to={path}>
                                <div
                                    className={`side_bar_child_mobile ${location.pathname === path ? "side_bar_child_active" : ""
                                        }`}
                                >
                                    <img
                                        src={location.pathname === path ? activeIcon : icon}
                                        alt={label}
                                    />
                                    <span>{label}</span>
                                </div>
                            </Link>
                        ))}

                        <div className="side_bar_bottom">
                            <div>
                                <img src="/images/sidebar-icon.svg" alt="icon" />
                            </div>
                            <div className="side_bar_bottom_text">
                                <span>Urban Movers</span>
                                <span>Workspace</span>
                            </div>
                        </div>
                    </div>

                    {/* Overlay (click to close sidebar) */}
                    <div className="sidebar_overlay" onClick={toggleSidebar}></div>
                </div>


            </div>
            <LogoutModal
                showLogout={showLogout}
                onCancel={handleCancel}
                onDeactivate={handleDeactivate}
            />
        </div>
    );
};

export default SideBar;
