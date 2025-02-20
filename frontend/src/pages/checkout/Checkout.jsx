import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, url, token, products, getTotalCartAmount } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        phone: ""
    }); ``

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
            alert("You need to Login first");
            navigate('/cart')
        } else if (getTotalCartAmount() === 0) {
            alert("You need to Login first");
            navigate('/cart')
        }
    }, [token])
    return (
        <div className="pt-20">
            <div className="min-h-screen  text-white py-16 px-4 sm:px-8 relative" >
                <div className="absolute z-[0] w-[60%] h-[100%] -left-[50%] rounded-full blue__gradient top-[-25%]"></div>

                <div className="max-w-screen-2xl mx-auto xl:px-10">
                    <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-[1]" onSubmit={handleSubmit}>

                        {/* -----------------Delivery Information ---------------------- */}
                        <div className="lg:col-span-2 p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* ----------- First Name -------------- */}
                                <div className="flex flex-col">
                                    <label htmlFor="first-name" className="mb-2 text-gray-300">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        value={data.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your first name"
                                        className=" border ring-amber-950	 border-gray-200 text-gray-300 rounded-lg px-4 py-4 outline-none bg-inherit"
                                    />
                                </div>
                                {/* --------------  Last Name ------------- */}
                                <div className="flex flex-col">
                                    <label htmlFor="last-name" className="mb-2 text-gray-300">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        required={true}
                                        id="last-name"
                                        name="lastName"
                                        value={data.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your last name"
                                        className=" border border-gray-200 text-gray-300 rounded-lg px-4 py-4 outline-none bg-inherit"
                                    />
                                </div>
                                {/* ---------- Email --------- */}
                                <div className="flex flex-col sm:col-span-2">
                                    <label htmlFor="email" className="mb-2 text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        name="email"
                                        value={data.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className=" border border-gray-200 text-gray-300 rounded-lg px-4 py-4 outline-none bg-inherit"
                                    />
                                </div>
                                {/* ----------- Street Address ---------------- */}
                                <div className="flex flex-col sm:col-span-2">
                                    <label htmlFor="street" className="mb-2 text-gray-300">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        id="street"
                                        required
                                        name="street"
                                        value={data.street}
                                        onChange={handleInputChange}
                                        placeholder="Enter your street address"
                                        className=" border border-gray-200 text-gray-300 rounded-lg px-4 py-4 outline-none bg-inherit"
                                    />
                                </div>
                                {/* -------------- Phone ----------- */}
                                <div className="flex flex-col sm:col-span-2">
                                    <label htmlFor="phone" className="mb-2 text-gray-300">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={data.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number"
                                        className=" border border-gray-200 text-gray-300 rounded-lg px-4 py-4 outline-none bg-inherit"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ----------- Cart Total -------------- */}
                        <div className=" p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Cart Summary</h2>
                            <div className="divide-y divide-gray-700">
                                {products.map((item) => {
                                    if (cartItems[item._id] > 0) {
                                        return (
                                            <div
                                                key={item._id}
                                                className="flex justify-between items-center py-4"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={item.image[0]?.startsWith("http") ? item.image[0] : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${product.image[0]}`}
                                                        alt={item.title}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />
                                                    <div>
                                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                                        <p className="text-sm text-gray-400">
                                                            {cartItems[item._id]} x ${parseFloat(item.price).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                })}
                            </div>
                            {
                                Object.values(cartItems).some(qty => qty > 0) ? (
                                    <div className="mt-6 border-t border-gray-700 pt-4">
                                        <h3 className="text-xl font-bold">
                                            Grand Total: ${getTotalCartAmount()}
                                        </h3>
                                        <div className="lg:col-span-3 text-center mt-8">
                                            <button className="w-full  bg-blue-gradient hover:bg-light-gradient text-white px-6 py-3 rounded-lg font-semibold"
                                                type="submit">
                                                Place Order
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-6 border-t border-gray-700 pt-4">
                                            <h3 className="text-lg font-bold text-red-500">🛒 Your cart is empty</h3>
                                    </div>
                                )
                            }

                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Checkout;
