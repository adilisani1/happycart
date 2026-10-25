import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import './trendings.css';

const Trendings = () => {
    const { products } = useContext(StoreContext);
    const trendyProducts = products.filter(product => product.trendy);

    return (
        <section className="hc-trendy">
            <div className="hc-section-head">
                <span className="section-kicker">Moving fast</span>
                <h2 className="section-heading">Trendy</h2>
            </div>
            <div className="hc-trendy-grid max-w-screen-2xl mx-auto px-5 sm:px-10 lg:px-20 mb-24">
                {trendyProducts.map((product) => (
                    <Link
                        to={`/products/${product._id}`}
                        key={product._id}
                        className="hc-trendy-item"
                    >
                        <img
                            src={product.image[0]?.startsWith("http") ? product.image[0] : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${product.image[0]}`}
                            alt={product.title}
                        />
                        <div className="hc-trendy-meta">
                            <span>{product.category}</span>
                            <h3>{product.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Trendings;
