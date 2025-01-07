import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MenuContext } from '../../context/MenuProvider/MenuProvider';
import './menu.css';

export const Menu = () => {
    const { open, setOpen } = useContext(MenuContext);

    const handleMenuToggle = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>

            <div className={`button ${open ? 'open' : ''}`} onClick={handleMenuToggle}>
                <span className='burger-icon'></span>
            </div>

            {
                open && (
                    <ul
                        className='absolute bg-[var(--primary-color)] text-white top-20 left-0 w-full h-[calc(100vh-80px)] transition-all ease-in duration-300'>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/shop">Shop</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                )
            }
        </React.Fragment>
    );
};
