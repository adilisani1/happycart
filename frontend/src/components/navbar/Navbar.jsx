import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoCart from '/assets/images/logo/happy-cart-logo2.png';
import { BsFillHandbagFill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import { IoMdExit } from "react-icons/io";

import './navbar.css';
import { Menu } from '../menu/Menu';
import navLinks from '../../utils/menuLinks';
import { StoreContext } from './../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const { cartItems, token, setToken } = useContext(StoreContext);
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
        setToken("");
        navigate('/');

    };

    return (
        <header className={`h-20 pt-4 md:py-4 px-2 md:px-8 lg:px-16 xl-32 2xl:px-64 shadow-sm header ${scroll > 40 ? 'nav-bg-gradient shadow-2xl' : ''}`}

        >
            {/* SMALL SCREENS */}
            <div className='flex xl:hidden items-center justify-between'>
                <div className='flex-1' >
                    <Menu />
                </div>
                <div className='flex-1 flex justify-center'>
                    <NavLink to='/' className='flex items-center gap-1'>
                        <img className='md:w-[43px] w-[32px]' src={logoCart} alt='happy-cart-logo' />
                        <div className='pt-2.5'>
                            <h4 className='md:text-[20px] text-md font-extrabold'>happycart</h4>
                        </div>
                    </NavLink>
                </div>
                <div className='flex-1 flex justify-end items-center'>
                    <div className='flex gap-2 items-center'>

                        <NavLink to="/cart" className="xl:relative md:bg-none border border-gray-400 bg-card-color-one p-3.5 shadow-2xl rounded-full fixed bottom-10 right-6 ">
                            <span className='text-[20px] md:text-2xl'>
                                <BsFillHandbagFill /></span>
                            {Object.keys(cartItems).length > 0 ? (
                                <div className="absolute sm:top-[12px] sm:right-[12px] top-[11px] right-[11px] bg-red-500 text-white rounded-full w-2 h-2 flex items-center justify-center" />
                            ) : null}
                        </NavLink>
                        {!token ? <button className='bg-blue-gradient hover:bg-light-gradient py-2 px-5 rounded-full font-poppins font-medium text-sm' onClick={setShowLogin}>Sign in</button>
                            :
                            <div className='navbar-profile '>
                                <img
                                    src='/assets/images/profile_image.png'
                                    alt="Admin Profile"
                                    className="navbar-profile-image md:w-10 w-8 cursor-pointer"
                                />
                                <ul className='navbar-profile-list '>
                                    <li className='mb-2' onClick={() => navigate('/myorders')}>
                                        <span className='bag-icon'><BsFillHandbagFill /></span>
                                        <p className='text-black'>Orders</p>
                                    </li>
                                    <hr />
                                    <li className=''>
                                        <span className='exit-icon'>
                                            <IoMdExit />
                                        </span>
                                        <button onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* BIGGER SCREENS */}
            <nav className='hidden xl:flex justify-between items-center gap-8 h-full'>
                {/* LEFT AREA */}
                <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
                    <Link to='/' className='flex items-center  gap-1'>
                        <img className=' md:w-[43px] w-[38px] -mt-2' src={logoCart} alt='happy-cart-logo' />
                        <div className=''>
                            <h4 className=' md:text-[20px] text-md  font-extrabold leading-6'>happycart</h4>
                        </div>
                    </Link>
                    <ul className='hidden xl:flex gap-7 '>
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.path} className="hover:text-primary-color">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT AREA */}
                <div className='w-1/3 xl:w-1/2'>
                    <div className='flex  gap-6 items-center'>
                        <form className="flex justify-between gap-4 bg-gray-100 rounded-md p-2 flex-1" onSubmit={handleSearch}>
                            <input className='flex-1 bg-transparent outline-none text-black ml-2' type="text" placeholder='Search your product' name="search" />
                            <button className='cursor-pointer bg-none' type='submit'>
                                <span className='text-black'><IoSearchOutline /></span>
                            </button>
                        </form>
                        <div className='flex items-center gap-4 xl:gap-6'>
                            <Link to="/cart" className='relative'>
                                <span className=' text-lg  md:text-2xl ' >
                                    <BsFillHandbagFill />
                                </span>
                                {Object.keys(cartItems).some((item) => cartItems[item]) > 0 && (
                                    <div className="absolute top-[-2px] right-[-3px] bg-red-500 text-white rounded-full w-2 h-2 flex items-center justify-center" />
                                )}
                            </Link>
                            {!token ? <button className='bg-blue-gradient hover:bg-light-gradient py-2 px-5 rounded-full font-poppins font-medium' onClick={setShowLogin}>Sign in</button>
                                :
                                <div className='navbar-profile '>
                                    <img
                                        src='/assets/images/profile_image.png'
                                        alt="Admin Profile"
                                        className="navbar-profile-image w-10 cursor-pointer"
                                    />
                                    <ul className='navbar-profile-list '>
                                        <li className='mb-2' onClick={() => navigate('/myorders')}>
                                            <span className='bag-icon '><BsFillHandbagFill /></span>
                                            <p className='text-black'>Orders</p></li>
                                        <hr />
                                        <li className=''>
                                            <span className='exit-icon'>
                                                <IoMdExit />
                                            </span>
                                            <button onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
