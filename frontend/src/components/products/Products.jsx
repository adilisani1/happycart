import React, { useContext, useState } from 'react'
import Trendings from '../Trendings'
import ReviewSection from '../Reviews/Reviews'
import FollowUs from '../FollowUs'
import { Link } from 'react-router-dom'
import { StoreContext } from './../../context/StoreContext';

const Products = () => {

    const { products, loading } = useContext(StoreContext);
    const featuredProducts = products.filter(product => product.featured);

    return (
        <>
            <div className='md:pt-5 md:mb-32 mb-24'>
                <h1 className='text-center md:text-5xl text-2xl '>Featured</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-7 gap-20 max-w-screen-2xl rounded-xl px-10 pb-7 pt-5 sm:px-20 mx-auto relative">
                <div class="absolute z-[0] w-[60%] h-[60%] -left[5%] rounded-full pink__gradient top-0"></div>

                {loading ? (
                    <div className="col-span-full flex justify-center items-center h-[200px]" >
                        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-indigo-500 border-solid"></div>
                        <p className='ml-3 text-xl' > Loading...</p>
                    </div>
                ) : featuredProducts.map((product) => (
                    <Link to={`/products/${product._id}`} key={product._id} className="bg-black-gradient
                
                transition-all duration-300 ease-in-out 
                transform hover:scale-105 
                rounded-2xl relative h-full w-full  cursor-pointer">
                        <div className="flex items-center justify-center pt-6">
                            <img className=" md:max-w-[400px] -mt-24 object-cover max-w-72"
                                src={product.image[0]?.startsWith("http") ? product.image[0] : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${product.image[0]}`}
                                alt="iphone" />
                        </div>
                        <div className=' flex items-center justify-center text-center flex-col mx-auto pt-4 pb-10'>
                            <h3>{product.title}</h3>
                            <p className='price text-price-color'>
                                {`$${product.price}`}
                            </p>
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