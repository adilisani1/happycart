import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './ProductDetails.css';

const StarRating = ({ rating }) => (
    <div className="pd-stars">
        {[1, 2, 3, 4, 5].map(i => (
            <span key={i} className={i <= Math.round(rating) ? 'pd-star filled' : 'pd-star'}>★</span>
        ))}
        <span className="pd-star-val">{rating} / 5</span>
    </div>
);

const ProductDetails = () => {
    const { id } = useParams();
    const { products, addToCart } = useContext(StoreContext);
    const [product, setProduct] = useState(null);
    const [added, setAdded] = useState(false);
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        const found = products.find(item => item._id === id);
        setProduct(found);
        setActiveImg(0);
    }, [id, products]);

    const handleAddToCart = () => {
        addToCart(product._id);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const getImgSrc = (img) =>
        img?.startsWith("http")
            ? img
            : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${img}`;

    if (!product) {
        return (
            <div className="pd-loading">
                <div className="pd-spinner" />
                <p>Loading product details...</p>
            </div>
        );
    }

    const images = Array.isArray(product.image) ? product.image : [product.image];

    return (
        <div className="pd-page">
            {/* Background blobs */}
            <div className="absolute z-[0] w-[50%] h-[60%] -right-[30%] rounded-full blue__gradient top-[-10%] pointer-events-none" />
            <div className="absolute z-[0] w-[40%] h-[40%] -left-[20%] rounded-full pink__gradient bottom-[10%] pointer-events-none" />

            <div className="pd-inner max-w-screen-2xl mx-auto px-5 md:px-10 relative z-[1]">

                {/* Breadcrumb */}
                <nav className="pd-breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to="/shop">Shop</Link>
                    <span>/</span>
                    <span className="active">{product.title}</span>
                </nav>

                {/* ── Main Grid ── */}
                <div className="pd-grid">

                    {/* Image Column */}
                    <div className="pd-img-col">
                        <div className="pd-main-img-wrap">
                            <div className="pd-main-img-glow" />
                            <img
                                className="pd-main-img"
                                src={getImgSrc(images[activeImg])}
                                alt={product.title}
                            />
                        </div>
                        {/* Thumbnails — only if multiple images */}
                        {images.length > 1 && (
                            <div className="pd-thumbs">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        className={`pd-thumb ${i === activeImg ? 'active' : ''}`}
                                        onClick={() => setActiveImg(i)}
                                    >
                                        <img src={getImgSrc(img)} alt={`view-${i}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Column */}
                    <div className="pd-info-col">
                        {/* Category pill */}
                        {product.category && (
                            <span className="pd-category-tag">{product.category}</span>
                        )}

                        <h1 className="pd-title">{product.title}</h1>

                        <StarRating rating={product.ratings} />

                        <div className="pd-price-row">
                            <span className="pd-price">${product.price}</span>
                            {product.trendy && (
                                <span className="pd-trendy-badge">🔥 Trending</span>
                            )}
                        </div>

                        <p className="pd-desc-short">
                            {product.description
                                ? product.description.slice(0, 180) + (product.description.length > 180 ? '…' : '')
                                : 'No description available for this product.'}
                        </p>

                        {/* Key features preview */}
                        {product.keyFeatures?.length > 0 && (
                            <ul className="pd-features-preview">
                                {product.keyFeatures.slice(0, 3).map((f, i) => (
                                    <li key={i}>
                                        <span className="pd-feature-check">✓</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button
                            className={`pd-add-btn bg-blue-gradient hover:bg-light-gradient text-white ${added ? 'added' : ''}`}
                            onClick={handleAddToCart}
                        >
                            {added ? '✓ Added to Cart!' : 'Add to Cart'}
                        </button>

                        {/* Trust badges */}
                        <div className="pd-badges">
                            {[
                                { icon: '🔒', text: 'Secure Payment' },
                                { icon: '🚚', text: 'Free Shipping' },
                                { icon: '↩️', text: 'Easy Returns' },
                            ].map((b, i) => (
                                <div key={i} className="pd-badge">
                                    <span>{b.icon}</span>
                                    <span>{b.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Description & Features ── */}
                <div className="pd-details-section">
                    <div className="pd-details-card bg-black-gradient">
                        <h2 className="pd-details-title">Product Description</h2>
                        <p className="pd-details-text">
                            {product.description || 'No description available for this product.'}
                        </p>
                    </div>

                    {product.keyFeatures?.length > 0 && (
                        <div className="pd-details-card bg-black-gradient">
                            <h2 className="pd-details-title">Key Features</h2>
                            <ul className="pd-features-list">
                                {product.keyFeatures.map((feature, i) => (
                                    <li key={i}>
                                        <span className="pd-feature-check">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;