import React, { useContext } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsCartXFill } from "react-icons/bs";
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

export const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, products, setCartItems, getTotalCartAmount, url } = useContext(StoreContext);

    const handleQuantityChange = (id, increment) => {
        setCartItems((prevCartItems) => {
            const updatedCart = { ...prevCartItems };

            if (updatedCart[id]) {
                updatedCart[id] += increment;

                if (updatedCart[id] <= 0) {
                    delete updatedCart[id];
                }
            } else if (increment > 0) {
                updatedCart[id] = 1;
            }

            return updatedCart;
        });
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1f] text-white pt-20">
            <main className="flex-grow px-4 sm:px-8 py-16">
                <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
                    {Object.values(cartItems).some(quantity => quantity > 0) ? "Your Cart" : "Your Cart is Empty"}
                </h1>

                <div className="max-w-5xl mx-auto">
                    {Object.values(cartItems).some(quantity => quantity > 0) && (
                        <div className="hidden md:grid grid-cols-5 gap-4 bg-slate-800 text-gray-300 p-4 rounded-t-lg font-bold">
                            <div className="col-span-2">Product</div>
                            <div>Price</div>
                            <div>Quantity</div>
                            <div>Remove</div>
                        </div>
                    )}

                    {/* Table Body */}
                    <div className="bg-card-color-one rounded-lg divide-y divide-gray-700">
                        {products.map((item) => {
                            if (cartItems[item._id] > 0) {
                                return (
                                    <div
                                        key={item._id}
                                        className="md:grid grid-cols-5 gap-4 p-4 items-center text-gray-200"
                                    >
                                        {/* Product Info */}
                                        <div className="col-span-2 flex items-center gap-4">
                                            <img
                                                src={url + '/images/' + item.image}
                                                alt={item.title}
                                                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg"
                                            />
                                            <div>
                                                <h2 className="sm:text-lg text-[15px] font-bold">{item.title}</h2>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div>${item.price}</div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleQuantityChange(item._id, -1)}>
                                                <AiOutlineMinus />
                                            </button>
                                            <span>{cartItems[item._id]}</span>
                                            <button onClick={() => handleQuantityChange(item._id, 1)}>
                                                <AiOutlinePlus />
                                            </button>
                                        </div>

                                        {/* Remove */}
                                        <div>
                                            <IoMdClose
                                                onClick={() => removeFromCart(item._id)}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Cart Total - Now hides when cart is empty */}
                    {Object.values(cartItems).some(quantity => quantity > 0) ? (
                        <div className="mt-8 text-right">
                            <h2 className="text-xl sm:text-2xl font-normal">
                                Grand Total: <span className="text-xl sm:text-2xl font-bold">${getTotalCartAmount()}</span>
                            </h2>
                            <button
                                className="mt-4 bg-card-color-one hover:opacity-80 text-white px-6 py-4 rounded-lg"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    );
};

export default Cart;
