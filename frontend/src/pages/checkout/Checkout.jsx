import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider/CartProvider";

const Checkout = () => {
    const { cartItems, setCartItems } = useContext(CartContext);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        phone: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateTotal = () => {
        return cartItems
            .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
            .toFixed(2);
    };




    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.street ||
            !formData.phone
        ) {
            alert("Please fill in all fields");
            return;
        }

        console.log("Checkout Form Submitted", formData);
        setCartItems([]);
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            street: "",
            phone: ""
        })


    };

    return (
        <div className="min-h-screen  text-white py-16 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
                <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                                    id="first-name"
                                    name="firstName"
                                    value={formData.firstName}
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
                                    id="last-name"
                                    name="lastName"
                                    value={formData.lastName}
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
                                    name="email"
                                    value={formData.email}
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
                                    name="street"
                                    value={formData.street}
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
                                    value={formData.phone}
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
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center py-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p className="text-sm text-gray-400">
                                                {item.quantity} x ${parseFloat(item.price).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {
                            cartItems.length > 0
                                ? (
                                    <div className="mt-6 border-t border-gray-700 pt-4">
                                        <h3 className="text-xl font-bold">
                                            Grand Total: ${calculateTotal()}
                                        </h3>
                                        <div className="lg:col-span-3 text-center mt-8">
                                            <button className="w-full bg-card-color-one hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold"
                                                onClick={handleSubmit}>
                                                Proceed to Payment
                                            </button>
                                        </div>
                                    </div>
                                )
                                : (
                                    <div className="mt-6 border-t border-gray-700 pt-4">
                                        <h3 className="text-lg font-bold">Your cart is empty</h3>
                                    </div>
                                )
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
