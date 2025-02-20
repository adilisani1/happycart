import React from 'react';
import logoCart from '/assets/images/logo/happy-cart-logo2.png';
import { NavLink } from 'react-router-dom';
import { menuLinks, quickLinks } from './../../utils/menuLinks';

const Footer = ({ setShowLogin }) => {
    return (
        <footer className=" text-white border-t-[1px] border-t-[#3F3E45]" >
            <div className="container mx-auto px-6 pt-10 pb-14 grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
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
                    <h3 className="text-md font-bold text-white opacity-80">Quick Links</h3>
                    <ul className="mt-4 space-y-2 text-sm font-light">
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
                    <h3 className="text-md font-bold text-white opacity-80">Menu</h3>
                    <ul className="mt-4 space-y-2 text-sm font-light">
                        {menuLinks.map((link, index) => (
                            <li key={index}>
                                {link.name === "Login" ? (
                                    <button
                                        onClick={() => setShowLogin(true)}
                                        className="hover:text-primary-color text-left"
                                    >
                                        {link.name}
                                    </button>
                                ) : (
                                        <NavLink to={link.path} className="hover:text-primary-color">
                                            {link.name}
                                        </NavLink>
                                )}
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
                            className="w-full px-4 py-3 text-sm  text-white placeholder-gray-400 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-primary-color"
                        />
                        <button
                            type="submit"
                            className="w-full mt-3 px-4 py-2.5 bg-blue-gradient  text-white text-sm font-semibold rounded hover:bg-purple-700 transition duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* -------------- Bottom ------------------- */}
            <div className="w-full nav-bg-gradient flex justify-center items-center md:flex-row flex-col pt-6  py-7 text-center text-sm text-gray-400 " style={{

            }}>
                &copy; {new Date().getFullYear()} Happy Cart. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
