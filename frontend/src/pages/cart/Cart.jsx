import React, { useContext } from 'react';
import { CartContext } from '../../context/CartProvider/CartProvider';
import { FaTrashAlt } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const { cartItems, setCartItems } = useContext(CartContext);

    const navigate = useNavigate();
    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const handleQuantityChange = (id, increment) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + increment }
                    : item
            ).filter((item) => item.quantity > 0)
        );
    };

    const calculateTotal = () => {
        return cartItems
            .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
            .toFixed(2);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1f] text-white">
            <main className="flex-grow px-4 sm:px-8 py-16">
                <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-400">Your cart is empty.</p>
                ) : (
                    <div className="max-w-5xl mx-auto">
                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-5 gap-4 bg-slate-800 text-gray-300 p-4 rounded-t-lg font-bold">
                            <div className="col-span-2">Product</div>
                            <div>Price</div>
                            <div>Quantity</div>
                            <div>Remove</div>
                        </div>

                        {/* Table Body */}
                        <div className="bg-card-color-one rounded-lg divide-y divide-gray-700">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="md:grid grid-cols-1 sm:grid-cols-5 gap-4 p-4 items-center text-gray-200"
                                >
                                    {/* Product Info */}
                                    <div className="col-span-2 flex justify-between md:items-center gap-4">
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h2 className="sm:text-lg text-[15px] font-bold break-words">{item.title}</h2>
                                            <p className="text-sm text-gray-400 md:hidden">
                                                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>

                                        {/* ------------ FOR SMALL SCSREEN -----------*/}
                                        {/* Quantity Controls */}
                                        <div className='md:hidden flex flex-col'>
                                            <div className="flex items-center gap-3 mb-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="text-slate-500 hover:text-slate-600 text-md"
                                                >
                                                    <AiOutlineMinus />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="text-slate-500 hover:text-slate-600 text-md"
                                                >
                                                    <AiOutlinePlus />
                                                </button>

                                            </div>
                                            <div className=" flex justify-end ">
                                                <button
                                                    className="text-gray-300 text-sm cursor-pointer hover:text-gray-600"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >Remove</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:block">${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>


                                    {/* ------------ FOR LARGE SCREEN -----------*/}
                                    {/* Quantity Controls */}
                                    <div className="md:flex hidden items-center gap-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                            className="text-slate-500 hover:text-slate-600 text-md"
                                        >
                                            <AiOutlineMinus />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                            className="text-slate-500 hover:text-slate-600 text-md"
                                        >
                                            <AiOutlinePlus />
                                        </button>

                                    </div>

                                    <div className=" md:block hidden ">
                                        <IoMdClose
                                            className="text-gray-300 text-lg cursor-pointer hover:text-gray-600"
                                            onClick={() => handleRemoveItem(item.id)}
                                        />
                                    </div>
                                </div>

                            ))}
                        </div>

                        {/* Cart Total */}
                        <div className="mt-8 text-right">
                            <h2 className="text-xl sm:text-2xl font-normal">
                                Grand Total: <span className="text-xl sm:text-2xl font-bold">${calculateTotal()}</span>
                            </h2>

                            <button className="mt-4 bg-card-color-one hover:opacity-80 text-white px-6 py-4 rounded-lg  w-full sm:w-auto"
                                onClick={handleCheckout}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
    )
}
            </main >
        </div >
    );
};

export default Cart;
