import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { products, url, addToCart } = useContext(StoreContext);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const selectedProduct = products.find((item) => item._id === id);
        setProduct(selectedProduct);
    }, [id, products]);

    if (!product) {
        return <div className="text-center py-10 text-white">Loading product details...</div>;

    }

    return (
        <div className="max-w-screen-2xl flex flex-col mx-auto pt-12">
            <main className="flex-grow px-4 sm:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative" >
                    <div className="absolute z-[0] w-[60%] h-[70%] -right-[40%] rounded-full blue__gradient top-[-10%]"></div>

                    <div className="flex justify-center">
                        <img
                            className="w-[250px] max-w-[400px] md:max-w-2xl object-cover rounded-lg"
                            src={product.image[0]?.startsWith("http") ? product.image[0] : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${product.image[0]}`}
                            alt={product.title}
                        />
                    </div>

                    {/* ---------- Product Details Section ---------- */}
                    <div className="flex flex-col justify-center text-left px-2">
                        <div className='md:block flex justify-between items-center'>
                            <h1 className="sm:text-3xl text-[16px] font-bold mb-4 text-white">{product.title}</h1>
                            <p className="md:text-xl text-price-color font-semibold mb-4">${product.price}</p>
                        </div>
                        <div className='md:block flex justify-between items-center'>
                            <p className="text-gray-300 mb-4">{product.category}</p>
                            <p className="text-sm text-gray-300 mb-4">Rating: {product.ratings} / 5</p>
                        </div>
                        <p className="text-gray-300 mb-6">Trendy: {product.trendy ? 'Yes' : 'No'}</p>
                        <button
                            className="md:py-4 md:px-6 py-3 px-4 font-poppins font-medium md:text-[18px] text-[15px] text-primary bg-blue-gradient hover:bg-light-gradient rounded-[10px] outline-none mt-10 text-white w-[200px]"
                            onClick={() => addToCart(product._id)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* ----------- Additional Information ---------- */}
                <div className="md:mt-20 mt-10">
                    <h2 className="md:text-2xl font-bold mb-4 text-white">Product Description</h2>
                    <p className="text-gray-300 md:text-base text-sm mb-6 leading-relaxed">{product.description || 'No description available for this product.'}</p>

                    {product.keyFeatures && product.keyFeatures.length > 0 && (
                        <>
                            <h2 className="md:text-2xl font-bold mb-4 text-white">Key Features</h2>
                            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                                {product.keyFeatures.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;
