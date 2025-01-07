import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const FollowUs = () => {
    const images = [
        '/assets/images/follow/follow-us-one.jpg',
        '/assets/images/follow/follow-us-one.jpg',
        '/assets/images/follow/follow-us-one.jpg',
        '/assets/images/follow/follow-us-one.jpg',
        '/assets/images/follow/follow-us-one.jpg',

    ];

    return (
        <div className="w-full bg-card-color-two text-white py-14 mt-10 mb-20">
            {/* Instagram Header with Icon */}
            <div className="text-center mb-8">
                <FaInstagram className="text-4xl text-pink-500 mx-auto mb-4" />
                <h2 className="text-3xl font-semibold mb-2">Follow Us on Instagram</h2>
                <p className="opacity-80">Check out our latest styles and trends</p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-6 sm:px-6 md:px-9">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={image}
                            alt={`Instagram post ${index + 1}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FollowUs;
