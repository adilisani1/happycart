import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { StoreContext } from "../../context/StoreContext";
import './checkout.css';

const Checkout = () => {
    const { cartItems, url, token, products, getTotalCartAmount } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        phone: ""
    });
    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(d => ({ ...d, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let orderItems = [];
        products.forEach((item) => {
            if (cartItems[item._id] > 0) {
                orderItems.push({ ...item, quantity: cartItems[item._id] });
            }
        });

        setSubmitting(true);
        try {
            const response = await axios.post(
                `${url}/api/order/place`,
                { address: data, items: orderItems, amount: getTotalCartAmount() },
                { headers: { token } }
            );
            if (response.data.success) {
                window.location.replace(response.data.session_url);
            } else {
                toast.error("Failed to place order. Please try again.");
                setSubmitting(false);
            }
        } catch {
            toast.error("Failed to place order. Please try again.");
            setSubmitting(false);
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            toast.error("You need to Login first");
            navigate('/cart');
        } else if (getTotalCartAmount() === "0.00") {
            toast.error("Your cart is empty");
            navigate('/cart');
        }
    }, [token, getTotalCartAmount, navigate]);

    const cartProducts = products.filter((item) => cartItems[item._id] > 0);
    const itemCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
    const grandTotal = getTotalCartAmount();

    return (
        <div className="checkout-page">
            <div className="checkout-inner">
                <div className="checkout-header">
                    <p className="checkout-kicker">Almost there</p>
                    <h1 className="checkout-title">Checkout</h1>
                    <p className="checkout-sub">
                        {itemCount} item{itemCount !== 1 ? "s" : ""} · confirm delivery details to continue
                    </p>
                </div>

                <form className="checkout-layout" onSubmit={handleSubmit}>
                    <div className="checkout-form-card">
                        <div className="checkout-section-head">
                            <h2>Delivery information</h2>
                            <Link to="/cart" className="checkout-back-link">Back to cart</Link>
                        </div>

                        <div className="checkout-row">
                            {[
                                { id: "firstName", label: "First name", placeholder: "John" },
                                { id: "lastName", label: "Last name", placeholder: "Doe" },
                            ].map(({ id, label, placeholder }) => (
                                <div key={id} className="checkout-field">
                                    <label htmlFor={id}>
                                        {label} <span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id={id}
                                        name={id}
                                        required
                                        value={data[id]}
                                        onChange={handleInputChange}
                                        placeholder={placeholder}
                                        autoComplete={id === "firstName" ? "given-name" : "family-name"}
                                    />
                                </div>
                            ))}
                        </div>

                        {[
                            { id: "email", label: "Email address", type: "email", placeholder: "john@example.com", autoComplete: "email" },
                            { id: "street", label: "Street address", type: "text", placeholder: "123 Main Street, City, State", autoComplete: "street-address" },
                            { id: "phone", label: "Phone number", type: "tel", placeholder: "+1 (555) 123-4567", autoComplete: "tel" },
                        ].map(({ id, label, type, placeholder, autoComplete }) => (
                            <div key={id} className="checkout-field">
                                <label htmlFor={id}>
                                    {label} <span>*</span>
                                </label>
                                <input
                                    type={type}
                                    id={id}
                                    name={id}
                                    required
                                    value={data[id]}
                                    onChange={handleInputChange}
                                    placeholder={placeholder}
                                    autoComplete={autoComplete}
                                />
                            </div>
                        ))}
                    </div>

                    <aside className="checkout-summary">
                        <h2>Order summary</h2>

                        <div className="checkout-items">
                            {cartProducts.map((item) => {
                                const qty = cartItems[item._id];
                                const total = (parseFloat(item.price) * qty).toFixed(2);
                                const imgSrc = item.image[0]?.startsWith("http")
                                    ? item.image[0]
                                    : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${item.image[0]}`;

                                return (
                                    <div key={item._id} className="checkout-item">
                                        <div className="checkout-item-media">
                                            <img src={imgSrc} alt={item.title} />
                                        </div>
                                        <div className="checkout-item-info">
                                            <h3>{item.title}</h3>
                                            <p>Qty {qty} × ${parseFloat(item.price).toFixed(2)}</p>
                                        </div>
                                        <p className="checkout-item-total">${total}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="checkout-totals">
                            <div className="checkout-total-row">
                                <span>Subtotal</span>
                                <span>${grandTotal}</span>
                            </div>
                            <div className="checkout-total-row">
                                <span>Shipping</span>
                                <span className="checkout-muted">At payment</span>
                            </div>
                            <div className="checkout-total-row grand">
                                <span>Total</span>
                                <span>${grandTotal}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="checkout-submit"
                            disabled={submitting}
                        >
                            {submitting ? "Redirecting…" : "Proceed to payment"}
                        </button>
                        <p className="checkout-secure-note">Secure payment · Stripe checkout</p>
                    </aside>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
