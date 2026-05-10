import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './checkout.css';

const inputClass = "checkout-input";
const labelClass = "checkout-label";

const Checkout = () => {
    const { cartItems, url, token, products, getTotalCartAmount } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        phone: ""
    });

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
            }
        } catch {
            toast.error("Failed to place order. Please try again.");
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

    return (
        <div className="checkout-page">
            <div className="absolute z-[0] w-[60%] h-[100%] -left-[50%] rounded-full blue__gradient top-[-25%] pointer-events-none" />

            <div className="checkout-inner max-w-screen-2xl mx-auto px-5 md:px-10 relative z-[1]">
                <div className="checkout-header">
                    <span className="checkout-tag">Almost There</span>
                    <h1 className="checkout-title">Checkout</h1>
                </div>

                <form className="checkout-grid" onSubmit={handleSubmit}>

                    {/* ── Delivery Info ── */}
                    <div className="checkout-card bg-black-gradient lg:col-span-2">
                        <h2 className="checkout-card-title">Delivery Information</h2>

                        <div className="checkout-row">
                            {[
                                { id: "firstName", label: "First Name", placeholder: "John" },
                                { id: "lastName", label: "Last Name", placeholder: "Doe" },
                            ].map(({ id, label, placeholder }) => (
                                <div key={id} className="checkout-field">
                                    <label htmlFor={id} className={labelClass}>
                                        {label} <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id={id}
                                        name={id}
                                        required
                                        value={data[id]}
                                        onChange={handleInputChange}
                                        placeholder={placeholder}
                                        className={inputClass}
                                    />
                                </div>
                            ))}
                        </div>

                        {[
                            { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                            { id: "street", label: "Street Address", type: "text", placeholder: "123 Main Street, City, State" },
                            { id: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 123-4567" },
                        ].map(({ id, label, type, placeholder }) => (
                            <div key={id} className="checkout-field">
                                <label htmlFor={id} className={labelClass}>
                                    {label} <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type={type}
                                    id={id}
                                    name={id}
                                    required
                                    value={data[id]}
                                    onChange={handleInputChange}
                                    placeholder={placeholder}
                                    className={inputClass}
                                />
                            </div>
                        ))}
                    </div>

                    {/* ── Order Summary ── */}
                    <div className="checkout-card bg-black-gradient checkout-summary">
                        <h2 className="checkout-card-title">Order Summary</h2>

                        <div className="checkout-items">
                            {products.map((item) => {
                                if (cartItems[item._id] > 0) {
                                    const qty = cartItems[item._id];
                                    const total = (parseFloat(item.price) * qty).toFixed(2);
                                    return (
                                        <div key={item._id} className="checkout-item">
                                            <img
                                                src={item.image[0]?.startsWith("http")
                                                    ? item.image[0]
                                                    : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${item.image[0]}`}
                                                alt={item.title}
                                                className="checkout-item-img"
                                            />
                                            <div className="checkout-item-info">
                                                <h3>{item.title}</h3>
                                                <p className="checkout-item-qty">Qty: {qty} × ${parseFloat(item.price).toFixed(2)}</p>
                                                <p className="checkout-item-total">${total}</p>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {Object.values(cartItems).some(q => q > 0) ? (
                            <div className="checkout-totals">
                                <div className="checkout-total-row">
                                    <span>Subtotal</span>
                                    <span>${getTotalCartAmount()}</span>
                                </div>
                                <div className="checkout-total-row grand">
                                    <span>Total</span>
                                    <span className="text-primary-color">${getTotalCartAmount()}</span>
                                </div>
                                <button
                                    type="submit"
                                    className="checkout-submit bg-blue-gradient hover:bg-light-gradient text-white"
                                >
                                    Proceed to Payment
                                </button>
                                <p className="checkout-secure-note">🔒 You'll be redirected to secure payment</p>
                            </div>
                        ) : (
                            <p className="text-center text-gray-400 mt-6">Your cart is empty</p>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Checkout;