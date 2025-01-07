import React from 'react';
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
            <div className="top">
                <div className=" md:mb-20 mb-0  max-w-screen-2xl mx-auto md:h-[540px] hero-card grid rounded-xl md:px-10 md:pt-2  sm:px-20 lg:gap-8 xl:gap-0 lg:grid-cols-12">
                    <div className="mr-auto  place-self-center lg:col-span-8 lg:order-none order-1 md:text-left text-center md:px-0 px-5 md:py-0 py-12 pb-14">
                        <p className="text-sm text-gray-400 mb-4">
                            Home {">"} <span className="text-blue-400 font-semibold">About Us</span>
                        </p>
                        <h1 className="md:text-5xl text-3xl font-extrabold text-white leading-tight mb-4">
                            About Us
                        </h1>
                        <p className="md:text-lg text-sm text-gray-300 leading-relaxed md:w-3/4">
                            Welcome to our Happy Cart electronics store! We are dedicated to delivering the best services and products to our valued customers. Our mission is to innovate and inspire, making a positive impact on everyone we serve.
                        </p>
                    </div>
                    <div className="lg:mt-0 lg:col-span-4 lg:flex md:mb-0  mb-5 mx-auto hidden">
                        <img
                            className="w-full object-cover overflow-visible  transform transition-transform duration-300"
                            src={TopImage}
                            alt="About Us"
                        />
                    </div>
                </div>

            </div>

            {/* Section 2 */}
            <div className="md:flex items-center justify-center mb-20">
                <div className="flex-1 mb-8">
                    <img className="w-full object-cover" src={SectionTwoImage} alt="Section Two" />
                </div>
                <div className="flex-1 md:px-0 px-6">
                    <h1 className="text-2xl mb-9 md:text-5xl md:w-8/12 w-10/12 md:mx-0 mx-auto md:text-left text-center leading-14">
                        We Craft Awesome With Great Experience
                    </h1>
                    <div className="md:w-8/12 md:text-left text-center">
                        <p className="md:text-[18px] text-sm text-gray-300 leading-relaxed md:w-5/6 mb-8">
                            Our company is a leading provider of virtual reality technology. We are dedicated to providing the best virtual reality experience to our customers. Our team of experts is constantly working to improve our products and services.
                        </p>
                    </div>
                    <button className="md:block md:justify-start md:ml-0 mx-auto flex justify-center    bg-orange-500 px-12 py-3 border-none rounded-md">
                        View
                    </button>
                </div>
            </div>

            {/* Section 3 */}
            <div className=" mb-20 text-center relative md:pb-36 pb-10">
                <div className=' absolute z-[10] top-[30%] left-0 right-0'>
                    <h1 className="md:text-5xl text-2xl font-extrabold mb-4 ">
                        Smart Fashion <br />
                        <span className="text-orange-500 md:text-5xl text-2xl " >With Smart Devices</span>
                    </h1>
                </div>
                <img
                    className="w-full opacity-50 md:h-auto h-[250px] mt-5 mx-auto object-cover rounded-lg shadow-lg"
                    src={SectionThreeImage}
                    alt="Smart Fashion"
                />
            </div>

            {/* Section 4 */}
            <div className=" mb-20">

                <section className=" text-white md:px-4 py-4 mb-14">
                    <h1 className="md:text-4xl text-2xl text-center font-extrabold text-white mb-5">
                        Our Team
                    </h1>

                    <div className="container mx-auto">
                        <Slider {...sliderSettings}>
                            {ourTeam.map((team, index) => (
                                <div
                                    key={index}
                                    className="bg-card-color-one flex justify-center items-center flex-col p-8 h-[300px] text-center rounded-2xl shadow-md mx-auto w-full"
                                >
                                    <div
                                        className="rounded-full overflow-hidden mb-4"
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

                                    <h3 className="text-lg font-semibold mb-1 mt-3">{team.name}</h3>
                                    <p className="text-gray-400 mb-2">{team.role}</p>
                                    <p className="text-sm text-gray-300 px-4">{team.description}</p>
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
