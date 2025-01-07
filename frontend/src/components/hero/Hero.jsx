import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './hero.css'
import heroImgOne from '/assets/images/hero-section-img-one.png'
import heroImgTwo from '/assets/images/hero-section-img-four.webp';
import { Link, NavLink } from 'react-router-dom';

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        // slidesToScroll: 1
    };
    return (
        //     
        <Slider {...settings}>
            <section className=" text-black md:px-2.5 px-1 ">
                <div className="hero-card grid max-w-screen-2xl md:mt-[90px] mt-[20px] rounded-xl md:px-10 pb-12 pt-5 sm:px-20 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-8 lg:order-none order-1 md:text-left text-center ">
                        <h1 className="md:max-w-2xl md:text-5xl xl:text-6xl mb-4 md:mb-9 text-[22px] font-extrabold tracking-tight leading-none  dark:text-white px-7">
                            Your Hub for Quality Electronics
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-8 md:text-lg lg:text-xl text-sm dark:text-gray-200 px-7 md:px-7">
                            Discover premium electronics at HappyCart. Shop cutting-edge gadgets and home tech with unbeatable quality, prices, and service—all in one place.
                        </p>

                        <div className=' md:px-7'>
                            <NavLink to="/shop" className="inline-flex items-center justify-center px-3 py-3 md:px-5 sm:py-3 text-[15px] sm:text-base font-medium text-center text-white bg-gray-900 border-2 border-gray-300 rounded-lg   focus:ring-4 focus:ring-gray-100 dark:text-white hover:text-black dark:border-gray-700 dark:hover:bg-white dark:focus:ring-gray-800">
                                Discover more
                            </NavLink>
                        </div>
                    </div>
                    <div className="lg:mt-0 lg:col-span-4 lg:flex md:mb-0 mb-5 mx-auto">
                        <img className='sm:max-w-[365px] md:max-w-[300px] max-w-[190px] w-full  md:h-[500px]  object-cover' src={heroImgOne} alt="mockup" />
                    </div>
                </div>
            </section>

            <section className=" text-black md:px-2.5 px-1 ">
                <div className="hero-card grid max-w-screen-2xl md:mt-[90px] mt-[20px] rounded-xl md:px-10 pb-12 pt-5 sm:px-20 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-8 lg:order-none order-1 md:text-left text-center ">
                        <h1 className="md:max-w-2xl md:text-5xl xl:text-6xl mb-4 md:mb-9 text-[22px] font-extrabold tracking-tight leading-none  dark:text-white px-7 md:px-7">
                            Your Hub for Quality Electronics
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-8 md:text-lg lg:text-xl text-sm dark:text-gray-200 px-7">
                            Discover premium electronics at HappyCart. Shop cutting-edge gadgets and home tech with unbeatable quality, prices, and service—all in one place.
                        </p>

                        <div className=' md:px-7'>
                            <NavLink to="/shop" className="inline-flex items-center justify-center px-3 py-3 md:px-5 sm:py-3 text-[15px] sm:text-base font-medium text-center text-white bg-gray-900 border-2 border-gray-300 rounded-lg   focus:ring-4 focus:ring-gray-100 dark:text-white hover:text-black dark:border-gray-700 dark:hover:bg-white dark:focus:ring-gray-800">
                                Discover more
                            </NavLink>
                        </div>
                    </div>
                    <div className="lg:mt-0 lg:col-span-4 lg:flex md:mb-0 mb-5 mx-auto">
                        <img className='sm:max-w-[365px] md:max-w-[300px] max-w-[190px] w-full  md:h-[500px]  object-cover' src={heroImgOne} alt="mockup" />
                    </div>
                </div>
            </section>

        </Slider>
    )
}
export default Hero;