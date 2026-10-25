import React, { useContext, useEffect, useState } from 'react'
import './verify.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying | success | failed

    useEffect(() => {
        const verifyOrder = async () => {
            try {
                const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
                if (response.data.success) {
                    setStatus('success');
                    setTimeout(() => navigate('/myorders'), 1800);
                } else {
                    setStatus('failed');
                }
            } catch {
                setStatus('failed');
            }
        };

        verifyOrder();
    }, [url, success, orderId, navigate]);

    return (
        <div className="verify-page">
            <div className="verify-card">
                {status === 'verifying' && (
                    <>
                        <div className="verify-spinner" />
                        <p className="verify-kicker">Payment</p>
                        <h1>Confirming your order</h1>
                        <p className="verify-copy">Hang tight — we&apos;re verifying your payment.</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="verify-check" aria-hidden="true">✓</div>
                        <p className="verify-kicker">Success</p>
                        <h1>Order placed</h1>
                        <p className="verify-copy">
                            Payment confirmed. Taking you to your orders…
                        </p>
                        <Link to="/myorders" className="btn-primary verify-cta">
                            View my orders
                        </Link>
                    </>
                )}

                {status === 'failed' && (
                    <>
                        <div className="verify-fail" aria-hidden="true">!</div>
                        <p className="verify-kicker">Something went wrong</p>
                        <h1>Payment not confirmed</h1>
                        <p className="verify-copy">
                            We couldn&apos;t verify this order. You can try again from your cart.
                        </p>
                        <div className="verify-actions">
                            <Link to="/cart" className="btn-primary">Back to cart</Link>
                            <Link to="/" className="btn-ghost">Go home</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Verify;
