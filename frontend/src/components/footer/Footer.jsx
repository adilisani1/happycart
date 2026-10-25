import React from 'react';
import logoCart from '/assets/images/logo/happy-cart-logo2.png';
import { NavLink } from 'react-router-dom';
import { menuLinks, quickLinks } from './../../utils/menuLinks';
import './footer.css';

const Footer = ({ setShowLogin }) => {
    return (
        <footer className="hc-footer">
            <div className="hc-footer-inner">
                <div className="hc-footer-brand">
                    <div className="hc-footer-logo">
                        <img src={logoCart} alt="Happy Cart Logo" />
                        <h2>HappyCart</h2>
                    </div>
                    <p>
                        Electronics that feel considered — quality gear, clear prices, and service that stays out of the way.
                    </p>
                </div>

                <div>
                    <h3>Quick links</h3>
                    <ul>
                        {quickLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink to={link.path}>{link.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3>Menu</h3>
                    <ul>
                        {menuLinks.map((link, index) => (
                            <li key={index}>
                                {link.name === "Login" ? (
                                    <button type="button" onClick={() => setShowLogin(true)}>
                                        {link.name}
                                    </button>
                                ) : (
                                    <NavLink to={link.path}>{link.name}</NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hc-footer-subscribe">
                    <h3>Stay in the loop</h3>
                    <p>New drops and quiet deals — no spam.</p>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input type="email" placeholder="Your email" aria-label="Email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="hc-footer-bottom">
                &copy; {new Date().getFullYear()} HappyCart. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
