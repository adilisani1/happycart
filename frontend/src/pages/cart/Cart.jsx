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
        <div className="min-h-screen flex flex-col  text-white pt-20 ">
            <main className="flex-grow px-4 sm:px-8 py-16 relative z-[2]">
                <div className="absolute z-[0] w-[45%] h-[100%] -left-[40%] rounded-full blue__gradient top-[-30%]"></div>
                <div className="absolute z-[1] w-[30%] h-[50%] left-0 rounded-full white__gradient  bottom-40"></div>

                <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
                    {Object.values(cartItems).some(quantity => quantity > 0) ? "Your Cart" : "Your Cart is Empty"}
                </h1>

                <div className="max-w-5xl mx-auto ">
                    {Object.values(cartItems).some(quantity => quantity > 0) && (
                        <div className="hidden md:grid grid-cols-5 gap-4 mb-4 pb-4 border-[1px] border-[#3F3E45] text-gray-300 p-4 rounded-t-lg font-bold">
                            <div className="col-span-2">Product</div>
                            <div>Price</div>
                            <div>Quantity</div>
                            <div>Remove</div>
                        </div>
                    )}

                    {/* Table Body */}
                    <div className="nav-bg-gradient rounded-lg divide-y divide-gray-700">
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
                                                src={item.image[0]?.startsWith("http") ? item.image[0] : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${product.image[0]}`}
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
                                className="mt-4 py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient hover:bg-light-gradient outline-none   text-white  rounded-lg"
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
