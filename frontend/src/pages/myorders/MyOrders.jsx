import React, { useContext, useEffect, useState } from 'react'
import './myorders.css';
import { StoreContext } from './../../context/StoreContext';
import axios from 'axios';
const MyOrders = () => {

    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext)

    const fetchOrders = async () => {
        const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])


    return (
        <div className='my-orders pt-20 mt-12 max-w-screen-2xl mx-auto'>
            <h2 className='text-2xl font-bold'>My Orders</h2>
            <div className='my-orders-container   flex flex-col gap-7 mt-8'>
                {data.map((order, index) => (
                    <div className='my-orders-order ' key={index}>
                        <img src='/assets/images/parcel_icon.png' alt='order-icon' />
                        <p className='flex'>
                            {order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.title + " (" + item.quantity + ")";
                                }
                                else {
                                    return item.title + " (" + item.quantity + "), ";
                                }
                            })}
                        </p>
                        <p>${order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b className='font-medium '>{order.status}</b></p>
                        <button className="track-order border-none py-3.5 rounded bg-card-color-one text-white hover:bg-opacity-65" onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders