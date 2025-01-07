import React from 'react';
import Slider from 'react-slick';
import './reviews.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import reviews from './../../utils/reivews';

const ReviewSection = () => {
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
        <section className="bg-card-color-two text-white md:px-4 py-24 mb-20">
            <div className="container mx-auto ">
                <h2 className="text-2xl font-semibold text-center text-white opacity-80 mb-8">
                    What Our Customers Say
                </h2>
                <Slider {...sliderSettings}>
                    {reviews.map((review, index) => (

                        <div
                            key={index}
                            className=" bg-card-color-one flex
                             justify-center items-center
                             flex-col p-8 h-[300px] text-center rounded-2xl shadow-md mx-auto w-full"

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
                                    src={review.icon}
                                    alt={`${review.name}'s Icon`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h3 className="text-lg font-semibold mb-3 mt-3">{review.name}</h3>
                            <p className="text-gray-400 mb-4">"{review.review}"</p>
                            <div className="flex text-center justify-center  text-primary-color text-lg space-x-1">
                                {review.stars}
                            </div>

                        </div>

                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default ReviewSection;
