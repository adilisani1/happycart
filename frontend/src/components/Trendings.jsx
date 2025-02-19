import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const Trendings = () => {

    const { products, url } = useContext(StoreContext);

    const trendyProducts = products.filter(product => product.trendy);
    return (
        <>
            <div className='pt-20 pb-8'>
                <h1 className='text-center md:text-5xl text-2xl'>Trendy</h1>
            </div>
            <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-2 md:gap-7 gap-10 max-w-screen-2xl rounded-xl px-10 pb-7 pt-5 sm:px-20 mb-20 mx-auto ">
                {trendyProducts.map((product) => (
                    <div key={product._id} className="w-full py-5 rounded-2xl flex flex-col sm:flex-row items-center justify-center transition-all duration-300 ease-in-out blue__gradient
                transform hover:scale-95 shadow-[0px_4px_6px_0px_rgba(236,_72,_153,_0.5)] cursor-pointer hover:shadow-[0px_4px_6px_0px_rgba(34,_197,_94,_0.5)] h-full text-center">
                        <img
                            className="md:max-w-[300px] sm:w-[250px] w-[200px]"
                            src={product.image[0]?.startsWith("http") ? product.image[0] : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${product.image[0]}`}

                            alt="Wireless Headphones" />

                        <div className="mt-5 sm:mt-0 sm:mb-0 sm:ml-5 mb-10">
                            <p className="price text-cyan-500">{`${product.category}`}</p>
                            <h3 className="text-lg font-semibold text-white">{product.title}</h3>
                        </div>
                    </div>
                ))}

            </div>
        </>

    );
};

export default Trendings;
