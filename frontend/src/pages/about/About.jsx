import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import Slider from 'react-slick';

import TopImage from '/assets/images/girl-with-vr.png';
import SectionTwoImage from '/assets/images/mobile.png';
import SectionThreeImage from '/assets/images/smart-fashion-img.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ourTeam from '../../utils/ourTeam';
const About = () => {


    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <div>
            {/* Section 1 */}
            <div className="top pt-20 pb-10">
                <div className="md:mb-20 mb-0 max-w-screen-2xl mx-auto md:h-[540px] hero-card grid rounded-xl md:px-10 md:pt-2 sm:px-20 lg:gap-8 xl:gap-0 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-8 lg:order-none order-1 md:text-left text-center md:px-0 px-5 md:py-0 py-12 pb-14">
                        <nav className="text-sm text-gray-400 mb-4" aria-label="Breadcrumb">
                            <Link to="/" className="hover:text-blue-400 transition-colors">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-blue-400 font-semibold">About Us</span>
                        </nav>
                        <h1 className="md:text-5xl text-3xl font-extrabold text-white leading-tight mb-4">
                            About Us
                        </h1>
                        <p className="md:text-lg text-sm text-gray-300 leading-relaxed md:w-3/4">
                            Welcome to our Happy Cart electronics store! We are dedicated to delivering the best services and products to our valued customers. Our mission is to innovate and inspire, making a positive impact on everyone we serve.
                        </p>
                    </div>
                    <div className="lg:mt-0 lg:col-span-4 lg:flex md:mb-0 mb-5 mx-auto hidden">
                        <img
                            className="w-full object-cover overflow-visible transform transition-transform duration-300"
                            src={TopImage}
                            alt="About Us"
                        />
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:flex items-center justify-center mb-20">
                <div className="flex-1 mb-8 md:mb-0">
                    <img className="w-full object-cover rounded-lg" src={SectionTwoImage} alt="Section Two" />
                </div>
                <div className="flex-1 md:px-8 px-6">
                    <h1 className="text-2xl mb-6 md:text-5xl md:w-full w-full md:mx-0 mx-auto md:text-left text-center text-white font-bold leading-tight">
                        We Craft Awesome With Great Experience
                    </h1>
                    <div className="md:w-full md:text-left text-center">
                        <p className="md:text-[18px] text-sm text-gray-300 leading-relaxed md:w-full mb-8">
                            Our company is a leading provider of virtual reality technology. We are dedicated to providing the best virtual reality experience to our customers. Our team of experts is constantly working to improve our products and services.
                        </p>
                    </div>
                    <Link to="/shop">
                        <button className="md:block md:justify-start md:ml-0 mx-auto flex justify-center bg-orange-500 hover:bg-orange-600 text-white md:px-12 md:py-3 px-6 py-2 border-none rounded-md transition-colors font-medium">
                            View Products
                        </button>
                    </Link>
                </div>
            </div>

            {/* Section 3 */}
            <div className=" mx-auto  mb-20 text-center relative md:pb-36 pb-20">
              
                <div className='relative'>
                     <img
                    className="w-full opacity-50 md:h-auto h-[300px] md:h-[500px] mt-5 mx-auto object-cover shadow-lg"
                    src={SectionThreeImage}
                    alt="Smart Fashion"
                    />
                      <div className='absolute z-[10] top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4'>
                    <h1 className="md:text-5xl text-2xl font-extrabold mb-4 text-white">
                        Smart Fashion <br />
                        <span className="text-orange-500 md:text-5xl text-2xl">With Smart Devices</span>
                    </h1>
                </div>
               </div>
            </div>

            {/* Section 4 */}
            <div className="mb-20 max-w-screen-2xl mx-auto px-4 sm:px-8">
                <section className="text-white md:px-4 py-4 mb-14">
                    <h1 className="md:text-4xl text-2xl text-center font-extrabold text-white mb-8">
                        Our Team
                    </h1>

                    <div className="container mx-auto px-4">
                        <Slider {...sliderSettings}>
                            {ourTeam.map((team, index) => (
                                <div key={index} className="px-2">
                                    <div className="bg-black-gradient-2 flex justify-center items-center flex-col p-6 md:p-8 min-h-[350px] text-center rounded-2xl shadow-md mx-auto w-full">
                                        <div
                                            className="rounded-full overflow-hidden mb-4 flex-shrink-0"
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                display: 'flex',
                                                margin: '0 auto',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px solid #fff',
                                            }}
                                        >
                                            <img
                                                src={team.image}
                                                alt={`${team.name}'s Icon`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <h3 className="text-lg font-semibold mb-1 mt-3 text-white">{team.name}</h3>
                                        <p className="text-gray-400 mb-2 text-sm">{team.role}</p>
                                        <p className="text-sm text-gray-300 px-4 line-clamp-3">{team.description}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
