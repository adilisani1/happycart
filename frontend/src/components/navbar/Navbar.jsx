import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoCart from '/assets/images/logo/happy-cart-logo2.png';
import { BsFillHandbagFill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { RiShoppingBag3Line } from "react-icons/ri";

import './navbar.css';
import { Menu } from '../menu/Menu';
import navLinks from '../../utils/menuLinks';
import { StoreContext } from './../../context/StoreContext';

const ProfileAvatar = ({ userData, className }) => {
    const display = userData?.name || userData?.email;
    const initials = display
        ? display.split(/[\s@]/).map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : 'HC';
    const colors = ['#FF5C35', '#0D7377', '#E84A24', '#2A9D8F', '#F4A261'];
    const bg = colors[(display?.charCodeAt(0) || 0) % colors.length];

    return (
        <div
            className={`rounded-full flex items-center justify-center text-white font-bold cursor-pointer select-none shrink-0 ${className}`}
            style={{ background: bg }}
        >
            <span className="text-sm leading-none">{initials}</span>
        </div>
    );
};

const ProfileDropdown = ({ userData, avatarClassName, navigate, handleLogout }) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onDoc = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, [open]);

    return (
        <div ref={rootRef} className={`navbar-profile ${open ? 'is-open' : ''}`}>
            <button
                type="button"
                className="navbar-profile-trigger"
                aria-expanded={open}
                aria-haspopup="true"
                aria-label="Account menu"
                onClick={() => setOpen((v) => !v)}
            >
                <ProfileAvatar userData={userData} className={avatarClassName} />
            </button>
            <ul className="navbar-profile-list">
                {userData?.name && (
                    <li className="pointer-events-none">
                        <p className="text-gray-500 text-xs font-medium truncate max-w-[200px] m-0">
                            Hi, {userData.name}
                        </p>
                    </li>
                )}
                {userData?.name && <hr />}
                <li
                    onClick={() => {
                        setOpen(false);
                        navigate('/profile');
                    }}
                >
                    <span className="bag-icon"><FiUser /></span>
                    <p className="m-0">Profile</p>
                </li>
                <hr />
                <li
                    className="mb-0"
                    onClick={() => {
                        setOpen(false);
                        navigate('/myorders');
                    }}
                >
                    <span className="bag-icon"><RiShoppingBag3Line /></span>
                    <p className="m-0">Orders</p>
                </li>
                <hr />
                <li
                    onClick={() => {
                        setOpen(false);
                        handleLogout();
                    }}
                >
                    <span className="exit-icon"><IoMdExit /></span>
                    <p className="m-0">Logout</p>
                </li>
            </ul>
        </div>
    );
};

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const { cartItems, token, setToken, userData, setUserData } = useContext(StoreContext);
    const [scroll, setScroll] = React.useState(0);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const mobileSearchRef = useRef(null);

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY);
        });
    }, []);

    useEffect(() => {
        if (mobileSearchOpen && mobileSearchRef.current) {
            mobileSearchRef.current.focus();
        }
    }, [mobileSearchOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value.trim();
        if (searchValue) {
            setMobileSearchOpen(false);
            navigate(`/search/${searchValue}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setToken("");
        setUserData(null);
        navigate('/');
    };

    const cartHasItems = Object.keys(cartItems).some((item) => cartItems[item]);

    return (
        <header className={`hc-header ${scroll > 40 || mobileSearchOpen ? 'is-scrolled' : ''} ${mobileSearchOpen ? 'search-open' : ''}`}>
            <div className="hc-header-inner">
                {/* ── SMALL SCREENS ── */}
                <div className="hc-mobile-bar xl:hidden">
                    <div className="hc-mobile-bar-left">
                        <Menu />
                        <NavLink to="/" className="hc-logo hc-logo--mobile">
                            <img src={logoCart} alt="happy-cart-logo" />
                            <span>HappyCart</span>
                        </NavLink>
                    </div>

                    <div className="hc-mobile-bar-right">
                        <button
                            type="button"
                            className="hc-mobile-search-btn"
                            aria-label="Search"
                            aria-expanded={mobileSearchOpen}
                            onClick={() => setMobileSearchOpen((v) => !v)}
                        >
                            <IoSearchOutline />
                        </button>

                        <NavLink to="/cart" className="hc-cart-fab" aria-label="Cart">
                            <BsFillHandbagFill />
                            {cartHasItems && <span className="hc-cart-dot" />}
                        </NavLink>

                        {!token
                            ? <button type="button" className="hc-signin hc-signin--mobile" onClick={setShowLogin}>Sign in</button>
                            : (
                                <ProfileDropdown
                                    userData={userData}
                                    avatarClassName="w-8 h-8"
                                    navigate={navigate}
                                    handleLogout={handleLogout}
                                />
                            )
                        }
                    </div>
                </div>

                {/* ── BIGGER SCREENS ── */}
                <nav className='hidden xl:flex justify-between items-center gap-8 w-full h-full'>
                    <div className='flex items-center gap-10'>
                        <Link to='/' className='hc-logo'>
                            <img src={logoCart} alt='happy-cart-logo' />
                            <span>HappyCart</span>
                        </Link>
                        <ul className='flex gap-7'>
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="hc-nav-link">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex gap-5 items-center flex-1 max-w-xl justify-end'>
                        <form className="hc-search" onSubmit={handleSearch}>
                            <input
                                type="search"
                                placeholder="Search products"
                                name="search"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="false"
                            />
                            <button type='submit' aria-label="Search">
                                <IoSearchOutline />
                            </button>
                        </form>

                        <div className='flex items-center gap-4'>
                            <Link to="/cart" className='hc-cart-link relative'>
                                <BsFillHandbagFill />
                                {cartHasItems && <span className="hc-cart-dot" />}
                            </Link>

                            {!token
                                ? <button className='hc-signin' onClick={setShowLogin}>Sign in</button>
                                : (
                                    <ProfileDropdown
                                        userData={userData}
                                        avatarClassName="w-10 h-10"
                                        navigate={navigate}
                                        handleLogout={handleLogout}
                                    />
                                )
                            }
                        </div>
                    </div>
                </nav>
            </div>

            {mobileSearchOpen && (
                <div className="hc-mobile-search-panel xl:hidden">
                    <p className="hc-mobile-search-title">Search products</p>
                    <form className="hc-search hc-search--mobile" onSubmit={handleSearch}>
                        <input
                            ref={mobileSearchRef}
                            type="search"
                            placeholder="Try Apple, headphones…"
                            name="search"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                        />
                        <button type="submit" aria-label="Search">
                            <IoSearchOutline />
                        </button>
                    </form>
                </div>
            )}
        </header>
    );
};

export default Navbar;
