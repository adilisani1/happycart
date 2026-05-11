import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import ShopItems from '../../components/ShopItem/ShopItems';
import './shop.css';

const Shop = () => {
    const { products, url, loading } = useContext(StoreContext);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('default');

    const filtered = products
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
            if (sortBy === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
            if (sortBy === 'rating') return b.ratings - a.ratings;
            return 0;
        });

    return (
        <div className="shop-page">

            {/* ── Banner ── */}
            <div className="shop-banner">
                <img
                    className="shop-banner-img"
                    src="/assets/images/shop-banner-now.png"
                    alt="Shop Banner"
                    style={{ objectPosition: "center 35%" }}
                />
                <div className="shop-banner-overlay" />
                <div className="shop-banner-content">
                    <span className="shop-tag">Happy Cart Store</span>
                    <h1 className="shop-banner-title">Welcome to Our Shop</h1>
                    <p className="shop-banner-sub">Find the best electronics, just for you.</p>
                </div>
            </div>

            {/* ── Controls ── */}
            <div className="shop-controls max-w-screen-2xl mx-auto px-4 sm:px-10">
                <div className="shop-search-wrap">
                    <span className="shop-search-icon">🔍</span>
                    <input
                        className="shop-search"
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="shop-sort-wrap">
                    <select
                        className="shop-sort"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value="default">Sort: Default</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </div>

            {/* ── Results count ── */}
            {!loading && (
                <p className="shop-count max-w-screen-2xl mx-auto px-4 sm:px-10">
                    {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
                </p>
            )}

            {/* ── Grid ── */}
            <div className="shop-grid max-w-screen-2xl mx-auto px-4 sm:px-10 pb-24">
                {loading ? (
                    <div className="shop-loader col-span-full">
                        <div className="shop-spinner" />
                        <p>Loading products...</p>
                    </div>
                ) : filtered.length > 0 ? (
                    filtered.map((product, i) => (
                        <ShopItems
                            key={i}
                            id={product._id}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                            ratings={product.ratings}
                            url={url}
                        />
                    ))
                ) : (
                            <div className="shop-empty col-span-full">
                                <span>😕</span>
                                <h2>No products found</h2>
                                <p>Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;