import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsProvider/ProductsProvider';
import { CartContext } from '../../context/CartProvider/CartProvider';

const ProductDetails = () => {

    const { id } = useParams();
    const { products } = useContext(ProductsContext);
    const [product, setProduct] = useState(null);

    const { addToCart } = useContext(CartContext)


    useEffect(() => {
        const selectedProduct = products.find((item) => item.id === parseInt(id, 10));
        setProduct(selectedProduct);
    }, [id, products]);

    if (!product) {
        return <div className="text-center py-10">Product not found or loading...</div>;
    }

    // const relatedProducts = products.filter(
    //     (item) => item.category === product.category && item.id !== product.id
    // );

    return (
        <div className="max-w-screen-2xl flex flex-col mx-auto ">
            <main className="flex-grow px-4 sm:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    <div className="flex justify-start">
                        <img
                            className="w-full max-w-[400px] md:max-w-2xl object-cover rounded-lg"
                            src={product.images[0]}
                            alt={product.title}
                        />
                    </div>

                    {/* ------------- Product Details Section ------------- */}
                    <div className="flex flex-col  justify-center text-left">
                        <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                        <p className="text-xl text-cyan-600 font-semibold mb-4">${product.price}</p>
                        <p className="text-gray-700 mb-4">{product.category}</p>
                        <p className="text-sm text-gray-500 mb-4">Rating: {product.ratings} / 5</p>
                        <p className="text-gray-600 mb-6">Trendy: {product.trendy ? 'Yes' : 'No'}</p>
                        <button className="bg-card-color-one hover:opacity-80 text-white px-4 w-[200px] h-[55px] py-2 rounded-lg"
                            onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* ---------------- Additional Information ----------------*/}
                <div className="md:mt-20 mt-10 ">
                    <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                    <p className="text-gray-600 mb-6">{product.description}</p>

                    <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-6">
                        <li>High performance and durability</li>
                        <li>Advanced features for seamless operation</li>
                        <li>Ergonomic design for easy use</li>
                        <li>Competitive pricing for its category</li>
                    </ul>
                </div>

            </main>


        </div >
    );
};

export default ProductDetails;
