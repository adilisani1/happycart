import React, { useContext, useEffect, useRef } from 'react'
import './sidebar.css';
import { MenuContext } from '../../context/MenuProvider/MenuProvider';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline, IoMenu, IoClose } from 'react-icons/io5';

const Sidebar = () => {
    const { open, setOpen } = useContext(MenuContext);
    const menuRef = useRef(null);
    const navigate = useNavigate();

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

    useEffect(() => {
        if (!open) return;

        const scrollY = window.scrollY;
        const { style } = document.body;
        const prev = {
            overflow: style.overflow,
            position: style.position,
            top: style.top,
            width: style.width,
        };

        style.overflow = 'hidden';
        style.position = 'fixed';
        style.top = `-${scrollY}px`;
        style.width = '100%';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            style.overflow = prev.overflow;
            style.position = prev.position;
            style.top = prev.top;
            style.width = prev.width;
            document.documentElement.style.overflow = '';
            window.scrollTo(0, scrollY);
        };
    }, [open]);

    const handleMenuToggle = () => {
        setOpen(!open);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value.trim();
        if (searchValue) {
            setOpen(false);
            navigate(`/search/${searchValue}`);
        }
    };

    return (
        <div className="menu-root">
            <button
                type="button"
                className={`menu-toggle ${open ? 'open' : ''}`}
                onClick={handleMenuToggle}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
            >
                {open ? <IoClose /> : <IoMenu />}
            </button>
            {open && (
                <div
                    className="menu-overlay"
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                />
            )}
            <div
                ref={menuRef}
                className={`menu-sidebar ${open ? 'menu-open' : ''}`}
            >
                <div className="close-btn-container">
                    <button className="close-btn" onClick={() => setOpen(false)}>
                        ✕
                    </button>
                </div>

                <div className="sidebar-content">
                    <p className="sidebar-search-title">Search products</p>
                    <form className="sidebar-search" onSubmit={handleSearch}>
                        <input
                            type="search"
                            name="search"
                            placeholder="Try Apple, headphones…"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                        />
                        <button type="submit" aria-label="Search">
                            <IoSearchOutline />
                        </button>
                    </form>

                    <ul>
                        <li>
                            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                        </li>
                        <li>
                            <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar