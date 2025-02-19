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
        return <div className="text-center py-10">Loading product details...</div>;

    }

    return (
        <div className="max-w-screen-2xl flex flex-col mx-auto pt-12">
            <main className="flex-grow px-4 sm:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative" >
                    <div className="absolute z-[0] w-[60%] h-[70%] -right-[40%] rounded-full blue__gradient top-[-10%]"></div>

                    <div className="flex justify-start">
                        <img
                            className="w-full max-w-[400px] md:max-w-2xl object-cover rounded-lg"
                            src={product.image[0]?.startsWith("http") ? product.image[0] : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${product.image[0]}`}
                            alt={product.title}
                        />
                    </div>

                    {/* ---------- Product Details Section ---------- */}
                    <div className="flex flex-col justify-center text-left">
                        <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                        <p className="text-xl text-price-color font-semibold mb-4">${product.price}</p>
                        <p className="text-gray-700 mb-4">{product.category}</p>
                        <p className="text-sm text-gray-500 mb-4">Rating: {product.ratings} / 5</p>
                        <p className="text-gray-600 mb-6">Trendy: {product.trendy ? 'Yes' : 'No'}</p>
                        <button
                            className="py-4 px-6 font-poppins font-medium md:text-[18px] text-[16px] text-primary bg-blue-gradient hover:bg-light-gradient rounded-[10px] outline-none mt-10 text-white w-[200px]"
                            onClick={() => addToCart(product._id)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* ----------- Additional Information ---------- */}
                <div className="md:mt-20 mt-10">
                    <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                    <p className="text-gray-600 mb-6">{product.description}</p>

                    <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-6">
                        {product.keyFeatures?.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;
