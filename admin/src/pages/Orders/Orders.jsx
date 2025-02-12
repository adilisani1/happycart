import "./orders.css";
import { useEffect } from "react";
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from "../../assets/assets"
const Orders = ({ url }) => {

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(`${url}/api/order/list`);
        if (response.data.success) {
            setOrders(response.data.data);
        }
        else {
            toast.error("Error fetching orders");
        }
    }
    useEffect(() => {
        fetchAllOrders();
    }, [])

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: event.target.value
        })

        if (response.data.success) {
            await fetchAllOrders();
            toast.success("Order Status Updated")
        }
    }

    return (
        <div className="order add-product">
            <h3 className="">Order Page</h3>

            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className=" order-item">
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.title + " (" + item.quantity + ")";
                                    }
                                    return item.title + " (" + item.quantity + "), ";
                                })}
                            </p>
                            <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                            <div className="order-item-address">
                                <p>{order.address.street}</p>
                            </div>
                            <p className="order-item-phone">{order.address.phone}</p>

                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Order Processing">Order Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders