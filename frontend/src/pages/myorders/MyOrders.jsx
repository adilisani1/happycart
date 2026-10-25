import React, { useContext, useEffect, useState } from 'react'
import './myorders.css';
import { StoreContext } from './../../context/StoreContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshingId, setRefreshingId] = useState(null);
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
            setRefreshingId(null);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [token]);

    const handleTrack = async (orderId) => {
        setRefreshingId(orderId);
        await fetchOrders();
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const statusClass = (status = '') => {
        const s = status.toLowerCase();
        if (s.includes('deliver')) return 'is-delivered';
        if (s.includes('out') || s.includes('ship')) return 'is-shipping';
        if (s.includes('cancel')) return 'is-cancelled';
        return 'is-processing';
    };

    return (
        <div className="orders-page">
            <div className="orders-inner">
                <div className="orders-header">
                    <p className="orders-kicker">HappyCart</p>
                    <h1 className="orders-title">My orders</h1>
                    <p className="orders-sub">
                        {loading
                            ? 'Loading your orders…'
                            : data.length
                                ? `${data.length} order${data.length !== 1 ? 's' : ''} on record`
                                : 'Track deliveries and past purchases here'}
                    </p>
                </div>

                {loading ? (
                    <div className="orders-loader">
                        <div className="orders-spinner" />
                        <p>Fetching orders…</p>
                    </div>
                ) : !token ? (
                    <div className="orders-empty">
                        <h3>Sign in to view orders</h3>
                        <p>Your order history appears here after you log in.</p>
                        <Link to="/" className="btn-primary">Go home</Link>
                    </div>
                ) : data.length === 0 ? (
                    <div className="orders-empty">
                        <h3>No orders yet</h3>
                        <p>When you place an order, it will show up here with live status.</p>
                        <Link to="/shop" className="btn-primary">Start shopping</Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {data.map((order, index) => (
                            <article className="order-card" key={order._id || index}>
                                <div className="order-card-top">
                                    <div>
                                        <p className="order-id">
                                            Order {order._id ? `#${String(order._id).slice(-6).toUpperCase()}` : `#${index + 1}`}
                                        </p>
                                        {formatDate(order.date) && (
                                            <p className="order-date">{formatDate(order.date)}</p>
                                        )}
                                    </div>
                                    <span className={`order-status ${statusClass(order.status)}`}>
                                        {order.status || 'Processing'}
                                    </span>
                                </div>

                                <div className="order-card-body">
                                    <div className="order-items">
                                        {order.items.map((item, i) => (
                                            <div className="order-item" key={`${order._id}-${i}`}>
                                                {item.image?.[0] && (
                                                    <img
                                                        src={item.image[0]?.startsWith('http')
                                                            ? item.image[0]
                                                            : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${item.image[0]}`}
                                                        alt={item.title}
                                                    />
                                                )}
                                                <div>
                                                    <h3>{item.title}</h3>
                                                    <p>Qty {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="order-meta">
                                        <div className="order-meta-row">
                                            <span>Items</span>
                                            <span>{order.items.length}</span>
                                        </div>
                                        <div className="order-meta-row order-amount">
                                            <span>Total</span>
                                            <span>${order.amount}</span>
                                        </div>
                                        <button
                                            type="button"
                                            className="order-track-btn"
                                            onClick={() => handleTrack(order._id)}
                                            disabled={refreshingId === order._id}
                                        >
                                            {refreshingId === order._id ? 'Updating…' : 'Refresh status'}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
