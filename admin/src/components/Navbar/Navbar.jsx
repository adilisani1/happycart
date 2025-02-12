import React from "react";

import "./navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
    return (
        <div className="navbar">

            <div className="navbar-left">
                <img src={assets.logo2} alt="Logo" className="navbar-logo" />
                <p className="navbar-admin-text">Admin Panel</p>
            </div>

            <div className="navbar-right">
                <img
                    src={assets.profile_image}
                    alt="Admin Profile"
                    className="navbar-profile-image"
                />
            </div>
        </div>
    );
};

export default Navbar;
