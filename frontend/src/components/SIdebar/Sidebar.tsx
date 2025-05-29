import React from "react";
import "./Sidebar.css";

const navItems = [
    { icon: "assets/home.svg", label: "Home" },
    { icon: "assets/profile.svg", label: "Profile" },
    { icon: "assets/settings.svg", label: "Settings" },
];

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-nav">
                <div className="sidebar-logo">
                    <img className="logo-icon" src="assets/logo.png" alt="" />
                    <span className="logo-text">Poller</span>
                </div>

                {navItems.map((item, idx) => (
                    <div key={idx} className="nav-item">
                        <img src={item.icon} alt={item.label} className="nav-icon" />
                        <span className="nav-label">{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="sidebar-logout">
                <img src="assets/Logout.svg" alt="Logout" className="nav-icon" />
                <span className="nav-label">Logout</span>
            </div>
        </div>

    );
};

export default Sidebar;
