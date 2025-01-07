import React from 'react';
import logoCart from '/assets/images/logo/happy-cart-logo2.png';
import { NavLink } from 'react-router-dom';
import { menuLinks, quickLinks } from './../../utils/menuLinks';

const Footer = () => {
    return (
        <footer className="bg-card-color-two text-white" >
            <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
                {/* ------------- Company Info--------- */}
                <div>
                    <div className="flex items-center space-x-3">
                        <img
                            src={logoCart}
                            alt="Happy Cart Logo"
                            className="h-14 w-auto"
                        />
                        <h2 className="text-lg font-semibold text-white opacity-80">Happy Cart</h2>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                        Your ultimate shopping destination for happiness and quality products.
                    </p>
                </div>

                {/* -------------- Quick Links ------------- */}
                <div>
                    <h3 className="text-md font-semibold text-white opacity-80">Quick Links</h3>
                    <ul className="mt-4 space-y-2 text-sm">
                        {quickLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink to={link.path} className="hover:text-primary-color">
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* -------------- Menu Links ---------------- */}
                <div>
                    <h3 className="text-md font-semibold text-white opacity-80">Menu</h3>
                    <ul className="mt-4 space-y-2 text-sm">
                        {menuLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink to={link.path} className="hover:text-primary-color">
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ------------ Stay Connected ----------------- */}
                <div>
                    <h3 className="text-md font-semibold text-white opacity-80">Stay Connected</h3>
                    <p className="mt-2 text-sm text-gray-400">
                        Subscribe to Happy Cart for the latest updates and exclusive offers.
                    </p>
                    <form className="mt-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 text-sm bg-card-color-one text-white placeholder-gray-400 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-color"
                        />
                        <button
                            type="submit"
                            className="w-full mt-3 px-4 py-2 bg-primary-color text-white text-sm font-semibold rounded hover:bg-purple-700 transition duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* -------------- Bottom ------------------- */}
            <div className="bg-card-color-one py-4 text-center text-sm text-gray-400 " style={{
                background: "linear-gradient(var(--card-color-one), var(--card-color-two))",
                "--card-color-two": "#150d2b",
                "--card - color - one": "#412291",
            }}>
                &copy; {new Date().getFullYear()} Happy Cart. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
