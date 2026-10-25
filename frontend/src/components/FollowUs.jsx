import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import './followUs.css';

const FollowUs = () => {
    const images = [
        '/assets/images/follow/follow-us-one.jpg',
        '/assets/images/follow/follow-us-two.jpg',
        '/assets/images/follow/follow-us-three.jpg',
        '/assets/images/follow/follow-us-four.jpg',
        '/assets/images/follow/follow-us-five.jpg',
    ];

    return (
        <section className="hc-follow">
            <div className="hc-follow-head">
                <FaInstagram className="hc-follow-icon" />
                <h2 className="section-heading">Follow along</h2>
                <p>Latest drops and everyday setups from HappyCart.</p>
            </div>

            <div className="hc-follow-grid">
                {images.map((image, index) => (
                    <div key={index} className="hc-follow-shot">
                        <img
                            src={image}
                            alt={`Instagram post ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FollowUs;
