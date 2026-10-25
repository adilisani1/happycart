import React, { useState } from 'react';
import Slider from 'react-slick';
import './reviews.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import reviews from './../../utils/reivews';

const ReviewSection = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const sliderSettings = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        centerMode: true,
        centerPadding: "0px",
        afterChange: (currentIndex) => {
            setActiveSlide(currentIndex + Math.floor(3 / 2));
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                },
            },
        ],
    };

    return (
        <section className="hc-reviews review-slider relative">
            <div className="hc-section-head">
                <span className="section-kicker">Social proof</span>
                <h2 className="section-heading">What customers say</h2>
            </div>
            <div className="container mx-auto px-2">
                <Slider {...sliderSettings}>
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="hc-review"
                            style={{
                                transform: index === activeSlide ? "scale(1.03)" : "scale(1)",
                                transition: "transform 0.3s ease-in-out",
                            }}
                        >
                            <div className="hc-review-avatar">
                                <img
                                    src={review.icon}
                                    alt={`${review.name}'s Icon`}
                                />
                            </div>
                            <h3>{review.name}</h3>
                            <p>"{review.review}"</p>
                            <div className="hc-review-stars">
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
