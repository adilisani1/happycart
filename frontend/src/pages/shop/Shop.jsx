import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import ShopItems from '../../components/ShopItem/ShopItems';

const Shop = () => {
    const { products, url, loading } = useContext(StoreContext);
    return (
        <div className="shade-parent min-h-screen pt-20 pb-24">
            {/* Banner Section */}
            <div className="w-full relative mb-14">
                <img
                    className="w-full xl:h-[550px] lg:h-[500px] md:h-[380px] sm:h-[300px] h-[220px] object-cover opacity-35"
                    src="/assets/images/shop-banner-now.png"
                    alt="Shop Banner"
                    style={{ objectPosition: "center 35%" }}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                    <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-[20px] font-bold mb-2 text-white">Welcome to Our Shop</h1>
                    <p className="lg:text-lg md:text-base sm:text-sm text-[12px] text-gray-200">Find the best products just for you!</p>
                </div>
            </div>

            {/* Products Section */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4 max-w-screen-2xl rounded-xl px-4 pb-7 pt-5 sm:px-20 mx-auto relative mb-20 text-white">
                {loading ? (
                    <div className="col-span-full flex justify-center items-center h-[200px]">
                        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-indigo-500 border-solid"></div>
                        <p className='ml-3 text-xl text-white' > Loading...</p>
                    </div>
                ) : products.length > 0 ? (
                    products.map((product, index) => (
                        <ShopItems
                            key={index}
                            id={product._id}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                            ratings={product.ratings}
                            url={url}
                        />
                    ))
                ) : (
                    <div className="text-center py-10">
                        <h2 className="text-lg font-semibold text-gray-500">No products available at the moment.</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
