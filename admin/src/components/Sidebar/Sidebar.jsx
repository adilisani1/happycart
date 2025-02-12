import React from "react";
import { assets } from "../../assets/assets";
import "./sidebar.css"; // Import the CSS file
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">

            {/* Sidebar Options */}
            <div className="sidebar-options">
                <NavLink to="/add" className="sidebar-option">
                    <img src={assets.add_icon} alt="Add Items" className="sidebar-icon" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to="/list" className="sidebar-option">
                    <img src={assets.order_icon} alt="List Items" className="sidebar-icon" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to="/orders" className="sidebar-option">
                    <img src={assets.order_icon} alt="Orders" className="sidebar-icon" />
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
