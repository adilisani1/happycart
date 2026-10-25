import React, { useContext } from 'react'
import Trendings from '../Trendings'
import ReviewSection from '../Reviews/Reviews'
import FollowUs from '../FollowUs'
import { Link } from 'react-router-dom'
import { StoreContext } from './../../context/StoreContext';
import './products.css'

const Products = () => {
    const { products, loading } = useContext(StoreContext);
    const featuredProducts = products.filter(product => product.featured);

    return (
        <>
            <div className="hc-section-head">
                <span className="section-kicker">Curated picks</span>
                <h2 className="section-heading">Featured</h2>
            </div>

            <div className="hc-product-grid max-w-screen-2xl mx-auto px-5 sm:px-10 lg:px-20 mb-24">
                {loading ? (
                    <div className="hc-loader">
                        <div className="hc-spinner" />
                        <p>Loading...</p>
                    </div>
                ) : featuredProducts.map((product) => (
                    <Link
                        to={`/products/${product._id}`}
                        key={product._id}
                        className="hc-product"
                    >
                        <div className="hc-product-media">
                            <img
                                src={product.image[0]?.startsWith("http") ? product.image[0] : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${product.image[0]}`}
                                alt={product.title}
                            />
                        </div>
                        <div className="hc-product-meta">
                            <h3>{product.title}</h3>
                            <p>{`$${product.price}`}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <Trendings />
            <ReviewSection />
            <FollowUs />
        </>
    )
}

export default Products
