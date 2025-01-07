import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoCart from '/assets/images/logo/happy-cart-logo2.png';
import { BsFillHandbagFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

import './navbar.css';
import { Menu } from '../menu/Menu';
import navLinks from '../../utils/menuLinks';
import { CartContext } from '../../context/CartProvider/CartProvider';



const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();

    const { cartItems } = useContext(CartContext);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;

        if (searchValue) {
            navigate(`/search/${searchValue}`);
        }
    };

    return (
        <header className=' h-20 py-3 md:py-4 px-2 md:px-8 lg:px-16 xl-32 2xl:px-64 shadow-sm header'>
            <div className='flex xl:hidden items-center justify-between'>
                <div className='flex-1'>
                    <Menu />
                </div>
                <div className='flex-1 flex justify-center'>
                    <NavLink to='/' className='flex items-center gap-1'>
                        <img className='md:w-[43px] w-[38px]' src={logoCart} alt='happy-cart-logo' />
                        <div className='pt-2.5'>
                            <h4 className='md:text-[20px] text-md font-extrabold'>happycart</h4>
                        </div>
                    </NavLink>
                </div>
                <div className='flex-1 flex justify-end items-center'>
                    <div className='flex gap-2 items-center'>

                        <NavLink to="/cart" className="relative">
                            <span className='text-[20px] md:text-2xl'>
                                <BsFillHandbagFill /></span>
                            {cartItems.length > 0 && (
                                <div className="absolute top-[-2px] right-[-3px] bg-red-500 text-white rounded-full w-2 h-2 flex items-center justify-center" />
                            )}
                        </NavLink>
                        <button className='text-[15px] md:text-2xl' onClick={setShowLogin}>Sign in</button>
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
                                <span className=' text-lg  md:text-2xl' >
                                    <BsFillHandbagFill />
                                </span>
                                {cartItems.length > 0 && (
                                    <div className="absolute top-[-2px] right-[-3px] bg-red-500 text-white rounded-full w-2 h-2 flex items-center justify-center" />
                                )}
                            </Link>
                            <button onClick={setShowLogin}>Sign in</button>

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
