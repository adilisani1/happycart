import React, { useContext } from 'react';
import { ProductsContext } from './../../context/ProductsProvider/ProductsProvider';
import { Link } from 'react-router-dom';

const Shop = () => {
    const { products } = useContext(ProductsContext);

    return (
        <div className="shade-parent min-h-screen">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-7 gap-10 max-w-screen-2xl rounded-xl px-8 pb-7 pt-5 mx-auto">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <Link to={`/products/${product.id}`} key={index}>
                            <div
                                className="
                                    shadow-[6px_-2px_12px_-3px_rgba(106,_82,_204,_0.47)]
                                    hover:shadow-lg
                                    transition-all duration-300 ease-in-out
                                    transform hover:scale-105
                                    rounded-2xl relative h-full w-full cursor-pointer bg-gradient-to-b from-[#412291] to-[#150d2b]"
                            >
                                <div className="flex items-center justify-center pt-12">
                                    <img
                                        className="
                                            xl:max-w-[350px] xl:h-[270px]
                                            lg:max-w-[300px] lg:h-[200px] 
                                            md:max-w-[250px] md:h-[200px] 
                                            sm:max-w-[200px] sm:h-[150px] 
                                            h-[200px]
                                            overflow-visible object-cover"
                                        src={product.images[0]}
                                        alt={product.title}
                                    />
                                </div>
                                <div className="flex items-center justify-center text-center flex-col mx-auto py-6 px-4 rounded-b-2xl">
                                    <h3 className="text-lg font-semibold text-white mb-2">{product.title}</h3>
                                    <p className="text-cyan-500 text-xl font-bold mb-2">
                                        {`$${product.price}`}
                                    </p>
                                    <p className="text-gray-400 text-sm pb-4">Rating: {product.ratings} / 5</p>
                                </div>
                            </div>
                        </Link>
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
