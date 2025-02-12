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
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className=' container'>
                {data.map((order, index) => (
                    <div className='my-orders-order' key={index}>
                        <img src='/assets/images/order_icon.png' alt='order-icon' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders