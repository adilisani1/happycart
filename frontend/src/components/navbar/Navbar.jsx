import React, { useContext, useState } from 'react';
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
    const name = userData?.name;
    const initials = name
        ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : '?';
    const colors = ['#7824f6', '#536dff', '#55a9ff', '#9da6f0', '#7a76f7'];
    const bg = colors[(name?.charCodeAt(0) || 0) % colors.length];

    return (
        <div
            className={`rounded-full flex items-center justify-center text-white font-bold cursor-pointer select-none shrink-0 ${className}`}
            style={{ background: `radial-gradient(circle at 30% 30%, ${bg}cc, #150d2b)` }}
        >
            <span className="text-sm leading-none">{initials}</span>
        </div>
    );
};

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const { cartItems, token, setToken, userData, setUserData } = useContext(StoreContext);
    const [scroll, setScroll] = React.useState(0);

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY);
        });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        if (searchValue) {
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

    return (
        <header className={`h-[90px] pt-5 md:py-4 px-2.5 md:px-8 lg:px-16 xl:32 2xl:px-64 shadow-sm header transition-all ease-in duration-300 ${scroll > 40 ? 'nav-bg-gradient shadow-2xl ' : ''}`}>

            {/* ── SMALL SCREENS ── */}
            <div className='flex xl:hidden items-center justify-between'>
                <div className='flex-1'>
                    <Menu />
                </div>
                <div className='flex-1 flex justify-center'>
                    <NavLink to='/' className='flex items-center gap-1'>
                        <img className='md:w-[43px] w-[32px]' src={logoCart} alt='happy-cart-logo' />
                        <div className='pt-2.5'>
                            <h4 className='md:text-[20px] text-xs font-extrabold text-white'>happycart</h4>
                        </div>
                    </NavLink>
                </div>
                <div className='flex-1 flex justify-end items-center'>
                    <div className='flex gap-2 items-center'>
                        <NavLink to="/cart" className="xl:relative md:bg-none border border-gray-300 bg-black-gradient p-3.5 shadow-3xl rounded-full fixed bottom-10 right-6">
                            <span className='text-[20px] md:text-2xl fill-white'>
                                <BsFillHandbagFill className='fill-white' />
                            </span>
                            {Object.keys(cartItems).length > 0 && (
                                <div className="absolute sm:top-[12px] sm:right-[12px] top-[11px] right-[11px] bg-red-500 text-white rounded-full w-2 h-2 flex items-center justify-center" />
                            )}
                        </NavLink>

                        {!token
                            ? <button className='bg-blue-gradient hover:bg-light-gradient py-2 px-5 rounded-full font-poppins font-medium md:text-sm text-[12px] text-white' onClick={setShowLogin}>Sign in</button>
                            : (
                                <div className='navbar-profile'>
                                    <ProfileAvatar userData={userData} className="md:w-10 md:h-10 w-8 h-8" />
                                    <ul className='navbar-profile-list'>
                                        <li onClick={() => navigate('/profile')}>
                                            <span className='bag-icon'><FiUser /></span>
                                            <p className='text-black'>Profile</p>
                                        </li>
                                        <hr />
                                        <li className='mb-2' onClick={() => navigate('/myorders')}>
                                            <span className='bag-icon'><RiShoppingBag3Line /></span>
                                            <p className='text-black'>Orders</p>
                                        </li>
                                        <hr />
                                        <li>
                                            <span className='exit-icon'><IoMdExit /></span>
                                            <button onClick={handleLogout}>Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* ── BIGGER SCREENS ── */}
            <nav className='hidden xl:flex justify-between items-center gap-8 h-full'>
                {/* LEFT */}
                <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
                    <Link to='/' className='flex items-center gap-1'>
                        <img className='md:w-[43px] w-[38px] -mt-2' src={logoCart} alt='happy-cart-logo' />
                        <div className=''>
                            <h4 className='md:text-[20px] text-md font-extrabold leading-6 text-white'>happycart</h4>
                        </div>
                    </Link>
                    <ul className='hidden xl:flex gap-7'>
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.path} className="hover:text-primary-color text-white">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT */}
                <div className='w-1/3 xl:w-1/2'>
                    <div className='flex gap-6 items-center'>
                        <form className="flex justify-between gap-4 bg-gray-100 rounded-md p-2 flex-1" onSubmit={handleSearch}>
                            <input className='flex-1 bg-transparent outline-none text-black ml-2' type="text" placeholder='Search your product' name="search" />
                            <button className='cursor-pointer bg-none search-button' type='submit'>
                                <IoSearchOutline className='fill-black text-black' />
                            </button>
                        </form>

                        <div className='flex items-center gap-4 xl:gap-6'>
                            <Link to="/cart" className='relative'>
                                <BsFillHandbagFill className='fill-white text-lg md:text-2xl' />
                                {Object.keys(cartItems).some((item) => cartItems[item]) > 0 && (
                                    <div className="absolute top-[-2px] right-[-3px] bg-red-500 text-white rounded-full w-2 h-2 flex items-center justify-center" />
                                )}
                            </Link>

                            {!token
                                ? <button className='bg-blue-gradient hover:bg-light-gradient py-2 px-5 rounded-full font-poppins font-medium text-white' onClick={setShowLogin}>Sign in</button>
                                : (
                                    <div className='navbar-profile'>
                                        <ProfileAvatar userData={userData} className="w-10 h-10" />
                                        <ul className='navbar-profile-list'>
                                            {userData?.name && (
                                                <li className='pointer-events-none pb-1'>
                                                    <p className='text-gray-500 text-xs font-medium truncate max-w-[120px]'>Hi, {userData.name}</p>
                                                </li>
                                            )}
                                            {userData?.name && <hr />}
                                            <li className='mt-1' onClick={() => navigate('/profile')}>
                                                <span className='bag-icon'><FiUser /></span>
                                                <p className='text-black'>Profile</p>
                                            </li>
                                            <hr />
                                            <li className='mb-2' onClick={() => navigate('/myorders')}>
                                                <span className='bag-icon'><RiShoppingBag3Line /></span>
                                                <p className='text-black'>Orders</p>
                                            </li>
                                            <hr />
                                            <li>
                                                <span className='exit-icon'><IoMdExit /></span>
                                                <button onClick={handleLogout}>Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
