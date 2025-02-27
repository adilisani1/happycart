import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductDetails from '../products/ProductsDetails';
import { StoreContext } from '../../context/StoreContext';

const ShopItems = ({ id, title, image, price, ratings, url }) => {

    return (

        <>
            {/* {!cartItems[id] ? <ProductDetails /> : null} */}

            <Link to={`/products/${id}`}>
                <div
                    className=" shadow-[6px_-2px_12px_-3px_rgba(106,_82,_204,_0.47)]
                                    hover:shadow-lg
                                    transition-all duration-300 ease-in-out
                                    transform hover:scale-105
                                    rounded-2xl relative h-full w-full cursor-pointer bg-black-gradient"
                >
                    <div className="flex items-center justify-center pt-4">
                        <img
                            className="
                                            xl:max-w-[350px] xl:h-[270px]
                                            lg:max-w-[300px] lg:h-[200px] 
                                            md:max-w-[220px] md:h-[170px] 
                                            sm:max-w-[200px] sm:h-[150px] 
                                            h-[100px] w-[130px]
                                            md:overflow-visible
                                            md:object-cover object-contain"
                            // src={url + '/images/' + image}
                            src={image[0]?.startsWith("http") ? image[0] : `https://res.cloudinary.com/dawa2cnxk/image/upload/products/${image[0]}`}
                            alt={title}
                        />
                    </div>
                    <div className="flex items-center justify-center text-center flex-col mx-auto py-6 px-4 rounded-b-2xl">
                        <h3 className="md:text-[17px] text-xs mb-1">{title}</h3>
                        <p className="text-price-color md:text-md text-sm font-bold mb-2">
                            {`$${price}`}
                        </p>
                        <p className="text-gray-400 md:text-sm text-xs pb-4">Rating: {ratings} / 5</p>
                    </div>
                </div>
            </Link>
        </>


    )
}

export default ShopItems