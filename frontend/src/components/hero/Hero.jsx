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
        // autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        // slidesToScroll: 1
    };
    return (
        //     
        <Slider {...settings}>
            <section className=" sm:py-2 py-6 ">

                <div className=" grid max-w-screen-2xl md:mt-[90px] mt-[20px] rounded-xl md:px-10 pb-12 pt-5 sm:px-20 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-8 lg:order-none order-1 md:text-left text-center ">

                        <div className='relative  justify-center items-center flex-1 flex'>
                            <h1 className="md:max-w-2xl md:text-5xl text-white xl:text-6xl relative z-[1] mb-4 md:mb-9 text-[22px] font-extrabold tracking-tight leading-none  dark:text-white px-7 ">
                                Your Hub for Quality Electronics
                            </h1>

                        </div>

                        <p className="max-w-2xl mb-8 font-light text-gray-200 lg:mb-8 md:text-lg lg:text-xl text-sm dark:text-gray-200 px-7 md:px-7">
                            Discover premium electronics at HappyCart. Shop cutting-edge gadgets and home tech with unbeatable quality, prices, and service—all in one place.
                        </p>

                        <div className=' md:px-7'>
                            <NavLink to="/shop" className="py-4 px-6 font-poppins font-medium md:text-[18px] text-[14px] text-primary bg-blue-gradient hover:bg-light-gradient rounded-[10px] outline-none mt-10 text-white">
                                Discover more
                            </NavLink>
                        </div>
                    </div>

                    <div className="lg:mt-0 lg:col-span-4">
                        <div className='relative justify-center items-center flex-1 flex   md:my-0 my-10 '>
                            <img className='object-cover relative z-[1] md:w-full w-52 h-full rounded' src={heroImgOne} alt="mockup" />
                            {/* Gradient Effects */}
                            <div className="absolute z-[0] w-[50%]  top-0 pink__gradient"></div>
                            <div className="absolute z-[1] w-[80%] h-[0%] rounded-full white__gradient bottom-40"></div>
                            <div className="absolute z-[0] w-[100%] h-[50%] right-20  blue__gradient"></div>
                        </div>

                    </div>

                </div>
            </section>

            <section className=" text-black md:px-2.5 px-1 ">
                <div className="hero-card grid max-w-screen-2xl md:mt-[90px] mt-[20px] rounded-xl md:px-10 pb-12 pt-5 sm:px-20 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-8 lg:order-none order-1 md:text-left text-center  ">


                        <div className='relative  justify-center items-center flex-1 flex'>
                            <h1 className="md:max-w-2xl md:text-5xl xl:text-6xl relative z-[1] mb-4 md:mb-9 text-[22px] font-extrabold tracking-tight leading-none  dark:text-white px-7 ">
                                Your Hub for Quality Electronics
                            </h1>

                        </div>
                        <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-8 md:text-lg lg:text-xl text-sm dark:text-gray-200 px-7">
                            Discover premium electronics at HappyCart. Shop cutting-edge gadgets and home tech with unbeatable quality, prices, and service—all in one place.
                        </p>

                        <div className=' md:px-7'>
                            <NavLink to="/shop" className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient hover:bg-light-gradient rounded-[10px] outline-none mt-10 text-white">
                                Discover more
                            </NavLink>
                        </div>
                    </div>
                    <div className="lg:mt-0 lg:col-span-4">
                        <div className='relative justify-center items-center flex-1 flex   md:my-0 my-10 '>
                            <img className='object-cover relative z-[1] md:w-full w-52 h-full rounded-[5]' src={heroImgOne} alt="mockup" />
                            {/* Gradient Effects */}
                            <div className="absolute z-[0] w-[50%]  top-0 pink__gradient"></div>
                            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40"></div>
                            <div className="absolute z-[0] w-[100%] h-[50%] right-20  blue__gradient"></div>
                        </div>

                    </div>
                </div>
            </section>

        </Slider>
    )
}
export default Hero;