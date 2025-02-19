import React from 'react';
import './home.css';
import Hero from '../../components/hero/Hero';
import { MdOutlineContactSupport } from "react-icons/md";
import { PiKeyReturn } from "react-icons/pi";
import { BsCreditCard2Front } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import Products from '../../components/products/Products';

const Home = () => {
    return (
        <section className=' '>
                <Hero />
                {/* OUR PROMISE */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-screen-2xl mb-32 rounded-xl px-5 md:px-10 md:pb-12 md:pt-5  mx-auto ">
                <div className="flex gap-2 md:gap-3 items-center p-3 md:p-4  rounded-lg text-white bg-black-gradient-2">
                        <span className="md:text-5xl text-[30px] text-white"><MdOutlineContactSupport /></span>
                        <div className="flex flex-col">
                            <h3 className="md:text-lg text-[13px] font-semibold">Support 24/7</h3>
                            <p className="md:text-sm text-[11px] hidden md:block text-gray-400">Dedicated 24/7 Support</p>
                        </div>
                    </div>

                <div className="flex gap-2 md:gap-3 items-center p-3 md:p-4  rounded-lg text-white bg-black-gradient-2">
                        <span className="md:text-5xl text-[30px] text-white"><PiKeyReturn /></span>
                        <div className="flex flex-col">
                            <h3 className="md:text-lg text-[13px] font-semibold">Easy Returns</h3>
                            <p className="md:text-sm text-[11px] hidden md:block text-gray-400">Shop With Confidence</p>
                        </div>
                    </div>

                <div className="flex gap-2 md:gap-3 items-center p-3 md:p-4  rounded-lg text-white bg-black-gradient-2">
                        <span className="md:text-5xl text-[30px] text-white"><BsCreditCard2Front /></span>
                        <div className="flex flex-col">
                            <h3 className="md:text-lg text-[13px] font-semibold">Card Payment</h3>
                            <p className="md:text-sm text-[11px] hidden md:block text-gray-400">12 Months Installments</p>
                        </div>
                    </div>

                <div className="flex gap-2 md:gap-3 items-center p-3 md:p-4  rounded-lg text-white bg-black-gradient-2">
                        <span className="md:text-5xl text-[30px] text-white"><LiaShippingFastSolid /></span>
                        <div className="flex flex-col">
                            <h3 className="md:text-lg text-[13px] font-semibold">Free Shipping</h3>
                            <p className="md:text-sm text-[11px] hidden md:block text-gray-400">Capped at $50 per order</p>
                        </div>
                    </div>
                </div>

                {/* MAIN PRODUCTS */}
                <Products />

        </section>
    );
}

export default Home;
