import React, { useContext } from 'react'
import iPhone from '/assets/images/products/iphone.png'
import Trendings from '../Trendings'
import ReviewSection from '../Reviews/Reviews'
import FollowUs from '../FollowUs'
import { ProductsContext } from './../../context/ProductsProvider/ProductsProvider';
import { Link } from 'react-router-dom'

const Products = () => {

    const { products } = useContext(ProductsContext);
    const featuredProducts = products.filter(product => product.featured);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-7 gap-20 max-w-screen-2xl rounded-xl px-10 pb-7 pt-5 sm:px-20 mx-auto">
                {featuredProducts.map((product, index) => (
                    <Link to={`/products/${product.id}`} key={index} className="shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] 
                hover:shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] 
                transition-all duration-300 ease-in-out 
                transform hover:scale-105 
                rounded-2xl relative h-full w-full  cursor-pointer">
                        <div className="flex items-center justify-center pt-6">
                            <img className=" md:max-w-[400px] -mt-24 object-cover max-w-72" src={product.images[0]} alt="iphone" />
                        </div>
                        <div className=' flex items-center justify-center text-center flex-col mx-auto pt-4 pb-10'>
                            <h3>{product.title}</h3>
                            <p className='price text-cyan-500'>
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