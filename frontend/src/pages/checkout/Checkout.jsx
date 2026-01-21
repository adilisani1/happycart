import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let orderItems = [];
        products.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount(),
        };

        try {
            let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert("Failed to place order. Please try again.");
            }


        } catch (error) {
            console.log(error);
            alert("Failed to place order. Please try again.");
        }
    };

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            toast.error("You need to Login first")
            navigate('/cart')
        } else if (getTotalCartAmount() === "0.00") {
            toast.error("Your cart is empty")
            navigate('/cart')
        }
    }, [token, getTotalCartAmount, navigate])
    return (
        <div className="pt-20">
            <div className="min-h-screen text-white py-16 px-3 sm:px-8 relative">
                <div className="absolute z-[0] w-[60%] h-[100%] -left-[50%] rounded-full blue__gradient top-[-25%]"></div>

                <div className="max-w-screen-2xl mx-auto xl:px-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center relative z-[1]">Checkout</h1>
                    
                    <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-[1]" onSubmit={handleSubmit}>
                        {/* -----------------Delivery Information ---------------------- */}
                        <div className="lg:col-span-2 bg-black-gradient rounded-xl p-6 md:p-8 shadow-lg border border-gray-800">
                            <h2 className="md:text-2xl text-xl font-bold mb-6 text-white">Delivery Information</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                {/* ----------- First Name -------------- */}
                                <div className="flex flex-col">
                                    <label htmlFor="firstName" className="mb-2 text-gray-300 md:text-base text-sm font-medium">
                                        First Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        value={data.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your first name"
                                        className="border border-gray-600 md:text-base text-sm text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none bg-gray-900/50 focus:border-primary-color focus:ring-2 focus:ring-primary-color/20 transition-all"
                                    />
                                </div>
                                
                                {/* --------------  Last Name ------------- */}
                                <div className="flex flex-col">
                                    <label htmlFor="lastName" className="mb-2 text-gray-300 md:text-base text-sm font-medium">
                                        Last Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        id="lastName"
                                        name="lastName"
                                        value={data.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your last name"
                                        className="border border-gray-600 md:text-base text-sm text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none bg-gray-900/50 focus:border-primary-color focus:ring-2 focus:ring-primary-color/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* ---------- Email --------- */}
                            <div className="flex flex-col mb-4">
                                <label htmlFor="email" className="mb-2 text-gray-300 md:text-base text-sm font-medium">
                                    Email Address <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    name="email"
                                    value={data.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                    className="border border-gray-600 md:text-base text-sm text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none bg-gray-900/50 focus:border-primary-color focus:ring-2 focus:ring-primary-color/20 transition-all"
                                />
                            </div>
                            
                            {/* ----------- Street Address ---------------- */}
                            <div className="flex flex-col mb-4">
                                <label htmlFor="street" className="mb-2 text-gray-300 md:text-base text-sm font-medium">
                                    Street Address <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    required
                                    name="street"
                                    value={data.street}
                                    onChange={handleInputChange}
                                    placeholder="123 Main Street, City, State"
                                    className="border border-gray-600 md:text-base text-sm text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none bg-gray-900/50 focus:border-primary-color focus:ring-2 focus:ring-primary-color/20 transition-all"
                                />
                            </div>
                            
                            {/* -------------- Phone ----------- */}
                            <div className="flex flex-col">
                                <label htmlFor="phone" className="mb-2 text-gray-300 md:text-base text-sm font-medium">
                                    Phone Number <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={data.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 123-4567"
                                    className="border border-gray-600 md:text-base text-sm text-white placeholder-gray-500 rounded-lg px-4 py-3 outline-none bg-gray-900/50 focus:border-primary-color focus:ring-2 focus:ring-primary-color/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* ----------- Cart Summary -------------- */}
                        <div className="bg-black-gradient rounded-xl p-6 md:p-8 shadow-lg border border-gray-800 h-fit sticky top-24">
                            <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>
                            
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {products.map((item) => {
                                    if (cartItems[item._id] > 0) {
                                        const quantity = cartItems[item._id];
                                        const itemTotal = parseFloat(item.price) * quantity;
                                        return (
                                            <div key={item._id} className="flex items-start gap-3 pb-4 border-b border-gray-700 last:border-0">
                                                <img
                                                    src={item.image[0]?.startsWith("http") ? item.image[0] : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${item.image[0]}`}
                                                    alt={item.title}
                                                    className="w-16 h-16 object-contain rounded-lg flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base font-semibold text-white mb-1 line-clamp-2">{item.title}</h3>
                                                    <p className="text-sm text-gray-400 mb-1">
                                                        Qty: {quantity} × ${parseFloat(item.price).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm font-medium text-primary-color">
                                                        ${itemTotal.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            
                            {Object.values(cartItems).some(qty => qty > 0) ? (
                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg text-gray-300">Subtotal</span>
                                        <span className="text-lg text-white font-semibold">${getTotalCartAmount()}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-xl font-bold text-white">Total</span>
                                        <span className="text-2xl font-bold text-primary-color">${getTotalCartAmount()}</span>
                                    </div>
                                    <button
                                        className="w-full bg-blue-gradient hover:bg-light-gradient text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                                        type="submit"
                                    >
                                        Proceed to Payment
                                    </button>
                                    <p className="text-xs text-gray-500 text-center mt-3">
                                        You will be redirected to secure payment
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <p className="text-center text-gray-400">Your cart is empty</p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
