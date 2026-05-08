import React, { useContext, useEffect, useState } from 'react'
import './myorders.css';
import { StoreContext } from './../../context/StoreContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsFillHandbagFill } from 'react-icons/bs';
import { LiaShippingFastSolid } from 'react-icons/lia';

const MyOrders = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { url, token } = useContext(StoreContext);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            const sorted = [...response.data.data].sort((a, b) => {
                const aDate = a.date ? new Date(a.date).getTime() : 0;
                const bDate = b.date ? new Date(b.date).getTime() : 0;
                return bDate - aDate;
            });
            setData(sorted);
        } catch {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders pt-20 pb-20 mt-12 max-w-screen-2xl mx-auto px-4 sm:px-8'>
            <h2 className='md:text-2xl text-[20px] font-bold md:text-left text-center'>My Orders</h2>

            {loading ? (
                <div className='flex justify-center items-center mt-24'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-solid' />
                </div>
            ) : data.length === 0 ? (
                /* ── Empty State ── */
                <div className='flex flex-col items-center justify-center mt-20 text-center gap-5'>
                    <div className='relative'>
                        <div className='w-28 h-28 rounded-full bg-black-gradient-2 border border-white/10 flex items-center justify-center'>
                            <BsFillHandbagFill className='text-5xl text-gray-500' />
                        </div>
                        <span className='absolute -bottom-1 -right-1 text-3xl'>📦</span>
                    </div>
                    <h3 className='text-xl font-semibold text-white mt-2'>No orders yet</h3>
                    <p className='text-gray-400 text-sm max-w-xs'>
                        Looks like you haven&apos;t placed any orders yet. Start shopping and your orders will appear here.
                    </p>
                    <div className='flex gap-3 mt-2'>
                        <Link
                            to='/shop'
                            className='bg-blue-gradient hover:bg-light-gradient text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2'
                        >
                            <LiaShippingFastSolid className='text-lg' />
                            Start Shopping
                        </Link>
                    </div>
                </div>
            ) : (
                <div className='my-orders-container flex flex-col gap-7 mt-8'>
                    {data.map((order, index) => (
                        <div className='my-orders-order' key={index}>
                            <img src='/assets/images/parcel_icon.png' alt='order-icon' />
                            <p className='flex flex-wrap'>
                                {order.items.map((item, i) => (
                                    i === order.items.length - 1
                                        ? item.title + " (" + item.quantity + ")"
                                        : item.title + " (" + item.quantity + "), "
                                ))}
                            </p>
                            <p>${order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b className='font-medium'>{order.status}</b></p>
                            <button
                                className="track-order border-none py-3.5 rounded bg-blue-gradient hover:bg-light-gradient text-white hover:bg-opacity-65"
                                onClick={fetchOrders}
                            >
                                Track Order
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;