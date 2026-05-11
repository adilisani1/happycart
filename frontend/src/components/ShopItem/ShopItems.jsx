import React from 'react';
import { Link } from 'react-router-dom';
import './ShopItems.css';

const StarRating = ({ rating }) => {
    const stars = Math.round(rating);
    return (
        <div className="shop-item-stars">
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className={i <= stars ? 'star filled' : 'star'}>★</span>
            ))}
            <span className="shop-item-rating-val">{rating}/5</span>
        </div>
    );
};

const ShopItems = ({ id, title, image, price, ratings }) => {
    const imgSrc = image[0]?.startsWith("http")
        ? image[0]
        : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${image[0]}`;

    return (
        <Link to={`/products/${id}`} className="shop-item-link">
            <div className="shop-item bg-black-gradient">

                {/* Image area */}
                <div className="shop-item-img-wrap">
                    <img
                        className="shop-item-img"
                        src={imgSrc}
                        alt={title}
                    />
                    <div className="shop-item-img-glow" />
                </div>

                {/* Info */}
                <div className="shop-item-info">
                    <h3 className="shop-item-title">{title}</h3>
                    <StarRating rating={ratings} />
                    <div className="shop-item-footer">
                        <span className="shop-item-price">${price}</span>
                        <span className="shop-item-cta">View →</span>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default ShopItems;