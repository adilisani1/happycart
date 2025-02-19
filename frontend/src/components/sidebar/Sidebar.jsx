import React, { useContext, useEffect, useRef } from 'react'
import './sidebar.css';
import { MenuContext } from '../../context/MenuProvider/MenuProvider';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const { open, setOpen } = useContext(MenuContext);
    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleMenuToggle = () => {
        setOpen(!open);
    };
    return (
        <>
            <div className={`button ${open ? 'open' : ''}`} onClick={handleMenuToggle}>
                <span className="burger-icon"></span>
            </div>
            <div
                ref={menuRef}
                className={`menu-sidebar ${open ? 'menu-open' : ''}`}
            >
                <div className="close-btn-container">
                    <button className="close-btn" onClick={() => setOpen(false)}>
                        ✕
                    </button>
                </div>

                <ul className="flex flex-col items-start justify-start h-screen pt-28 px-4 gap-7">
                    <li className="md:text-2xl text-md">
                        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                    </li>
                    <li className="md:text-2xl text-md">
                        <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
                    </li>
                    <li className="md:text-2xl text-md">
                        <Link to="/about" onClick={() => setOpen(false)}>About</Link>
                    </li>
                    <li className="md:text-2xl text-md">
                        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar