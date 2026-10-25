import React, { useContext } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
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

    const itemCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
    const hasItems = itemCount > 0;
    const cartProducts = products.filter((item) => cartItems[item._id] > 0);
    const grandTotal = getTotalCartAmount();

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
            <div className="cart-inner">
                <div className="cart-header">
                    <p className="cart-kicker">HappyCart</p>
                    <h1 className="cart-title">
                        {hasItems ? "Your cart" : "Your cart is empty"}
                    </h1>
                    {hasItems ? (
                        <p className="cart-sub">{itemCount} item{itemCount !== 1 ? "s" : ""} ready to checkout</p>
                    ) : (
                        <p className="cart-sub">Looks like you haven&apos;t added anything yet.</p>
                    )}
                </div>

                {!hasItems ? (
                    <div className="cart-empty">
                        <Link to="/shop" className="btn-primary">Browse shop</Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        <div className="cart-list">
                            {cartProducts.map((item) => {
                                const qty = cartItems[item._id];
                                const lineTotal = (parseFloat(item.price) * qty).toFixed(2);
                                const imgSrc = item.image[0]?.startsWith("http")
                                    ? item.image[0]
                                    : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${item.image[0]}`;

                                return (
                                    <article key={item._id} className="cart-card">
                                        <div className="cart-card-media">
                                            <img src={imgSrc} alt={item.title} />
                                        </div>

                                        <div className="cart-card-body">
                                            <div className="cart-card-top">
                                                <div>
                                                    <span className="cart-card-cat">{item.category}</span>
                                                    <h2 className="cart-card-title">{item.title}</h2>
                                                    <p className="cart-card-unit">${item.price} each</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="cart-remove"
                                                    onClick={() => removeFromCart(item._id)}
                                                    aria-label={`Remove ${item.title}`}
                                                >
                                                    <IoMdClose />
                                                </button>
                                            </div>

                                            <div className="cart-card-bottom">
                                                <div className="cart-qty">
                                                    <button
                                                        type="button"
                                                        className="cart-qty-btn"
                                                        onClick={() => handleQuantityChange(item._id, -1)}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <AiOutlineMinus />
                                                    </button>
                                                    <span className="cart-qty-val">{qty}</span>
                                                    <button
                                                        type="button"
                                                        className="cart-qty-btn"
                                                        onClick={() => handleQuantityChange(item._id, 1)}
                                                        aria-label="Increase quantity"
                                                    >
                                                        <AiOutlinePlus />
                                                    </button>
                                                </div>
                                                <p className="cart-card-line">${lineTotal}</p>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <aside className="cart-summary">
                            <h3>Order summary</h3>
                            <div className="cart-summary-row">
                                <span>Subtotal</span>
                                <span>${grandTotal}</span>
                            </div>
                            <div className="cart-summary-row">
                                <span>Shipping</span>
                                <span className="cart-summary-note">Calculated at checkout</span>
                            </div>
                            <div className="cart-summary-total">
                                <span>Total</span>
                                <span>${grandTotal}</span>
                            </div>
                            <button
                                type="button"
                                className="cart-checkout-btn"
                                onClick={handleProceedToCheckout}
                            >
                                Proceed to checkout
                            </button>
                            <Link to="/shop" className="cart-continue">
                                Continue shopping
                            </Link>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
