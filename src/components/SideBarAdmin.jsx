import React, { useState } from "react";
import "./sideBar.css";
import { Link, useLocation } from "react-router-dom";

// import logoAndTextNew from "../Assets/new-logo-zinter.svg"

const SideBarAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const location = useLocation();

    const navItems = [
        { path: "/overview-admin", icon: "/assets/dasboard-icon.svg", activeIcon: "/assets/overview-active-icon.svg", label: "Overview" },
        { path: "/request", icon: "/assets/truck-delivery.svg", activeIcon: "/assets/truck-delivery.svg", label: "Request" },
        { path: "/users", icon: "/assets/user-group.svg", activeIcon: "/assets/user-group-active.svg", label: "Users" },
        { path: "/transactions", icon: "/assets/credit-card.svg", activeIcon: "/assets/credit-card-active.svg", label: "Transactions" },
    ];

    const navItemsMobile = [
        { path: "/overview-admin", icon: "/assets/dasboard-icon.svg", activeIcon: "/assets/overview-active-icon.svg", label: "Overview" },
        { path: "/request", icon: "/assets/truck-delivery.svg", activeIcon: "/assets/truck-delivery.svg", label: "Request" },
    ];

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


                </div>
                <div className="header_container">
                    <div className="header_container_left">
                        <img src="/assets/new-logo-zinter-complete.svg" alt="" />
                        <span>{navItems.find(item => item.path === location.pathname)?.label || ""}</span>
                    </div>
                    <div className="header_container_right">
                        <img src="/assets/help-circle.svg" alt="" />
                        <img src="/assets/notification-03.svg" alt="" />
                    </div>
                </div>
                <div className="body_container"></div>
            </div>
            <div className="side_bar_header_mobile">
                <div className="side_bar_mobile">
                    <div onClick={toggleSidebar}>
                        <img src="/assets/hamburger_btn.svg" alt="" />
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
                        <img src="/assets/help-circle.svg" alt="" />
                        <img src="/assets/notification-03.svg" alt="" />
                    </div>
                </div>
                <div className={`side_bar_mobile_all ${isOpen ? "open" : ""}`}>
                    <div className="side_bar_container_mobile">
                        <div onClick={toggleSidebar} className="side_bar_logo_mobile">
                            <img src="/assets/logo_mobile_screen.svg" alt="" />
                        </div>
                        {navItemsMobile.map(({ path, icon, activeIcon, label }) => (
                            <Link key={path} to={path}>
                                <div className={`side_bar_child_mobile ${location.pathname === path ? "side_bar_child_active" : ""}`}>
                                    <img src={location.pathname === path ? activeIcon : icon} alt={label} />
                                    <span>{label}</span>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default SideBarAdmin;
