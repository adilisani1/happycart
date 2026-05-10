import React, { useContext } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './cart.css';

export const Cart = ({ setShowLogin = () => {} }) => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, products, setCartItems, getTotalCartAmount, token } = useContext(StoreContext);

    const handleProceedToCheckout = () => {
        if (!token) {
            setShowLogin(true);
            return;
        }
        navigate('/checkout');
    };

    const hasItems = Object.values(cartItems).some(q => q > 0);

    const handleQuantityChange = (id, increment) => {
        setCartItems(prev => {
            const updated = { ...prev };
            if (updated[id]) {
                updated[id] += increment;
                if (updated[id] <= 0) delete updated[id];
            } else if (increment > 0) {
                updated[id] = 1;
            }
            return updated;
        });
    };

    return (
        <div className="cart-page">
            {/* Background blobs */}
            <div className="absolute z-[0] w-[45%] h-[100%] -left-[40%] rounded-full blue__gradient top-[-30%] pointer-events-none" />
            <div className="absolute z-[1] w-[30%] h-[50%] left-0 rounded-full white__gradient bottom-40 pointer-events-none" />

            <div className="cart-inner max-w-5xl mx-auto relative z-[2]">
                <div className="cart-header">
                    <span className="cart-tag">{hasItems ? `${Object.values(cartItems).reduce((a, b) => a + b, 0)} Items` : "Empty"}</span>
                    <h1 className="cart-title">{hasItems ? "Your Cart" : "Your Cart is Empty"}</h1>
                    {!hasItems && (
                        <p className="cart-empty-sub">Looks like you haven't added anything yet.</p>
                    )}
                </div>

                {hasItems && (
                    <>
                        {/* Table header */}
                        <div className="cart-table-head hidden md:grid">
                            <div className="">Product</div>
                            <div>Price</div>
                            <div>Quantity</div>
                            <div>Remove</div>
                        </div>

                        {/* Table body */}
                        <div className="cart-table-body nav-bg-gradient">
                            {products.map((item) => {
                                if (cartItems[item._id] > 0) {
                                    return (
                                        <div key={item._id} className="cart-row">
                                            {/* Product */}
                                            <div className="cart-product ">
                                                <img
                                                    src={item.image[0]?.startsWith("http")
                                                        ? item.image[0]
                                                        : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${item.image[0]}`}
                                                    alt={item.title}
                                                    className="cart-img"
                                                />
                                                <h2 className="cart-item-name">{item.title}</h2>
                                            </div>

                                            {/* Price */}
                                            <div className="cart-cell">
                                                <span className="cart-cell-label">Price</span>
                                                <span className="text-price-color font-semibold">${item.price}</span>
                                            </div>

                                            {/* Quantity */}
                                            <div className="cart-cell">
                                                <span className="cart-cell-label">Qty</span>
                                                <div className="cart-qty">
                                                    <button className="cart-qty-btn" onClick={() => handleQuantityChange(item._id, -1)}>
                                                        <AiOutlineMinus />
                                                    </button>
                                                    <span className="cart-qty-val">{cartItems[item._id]}</span>
                                                    <button className="cart-qty-btn" onClick={() => handleQuantityChange(item._id, 1)}>
                                                        <AiOutlinePlus />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Remove */}
                                            <div className="cart-cell">
                                                <button
                                                    className="cart-remove"
                                                    onClick={() => removeFromCart(item._id)}
                                                    aria-label="Remove item"
                                                >
                                                    <IoMdClose />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* Total + CTA */}
                        <div className="cart-footer">
                            <div className="cart-total">
                                Grand Total:
                                <span className="cart-total-amount text-price-color">${getTotalCartAmount()}</span>
                            </div>
                            <button
                                className="bg-blue-gradient hover:bg-light-gradient text-white cart-checkout-btn"
                                onClick={handleProceedToCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;