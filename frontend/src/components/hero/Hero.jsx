import React from 'react';
import { NavLink } from 'react-router-dom';
import './hero.css';
import heroImg from '/assets/images/hero-section-img-one.png';

const Hero = () => {
    return (
        <section className="hc-hero" aria-label="HappyCart hero">
            <div className="hc-hero-media" aria-hidden="true">
                <div className="hc-hero-glow hc-hero-glow--pink pink__gradient" />
                <div className="hc-hero-glow hc-hero-glow--white white__gradient" />
                <div className="hc-hero-glow hc-hero-glow--blue blue__gradient" />
                <div className="hc-hero-img-wrap">
                    <img
                        className="hc-hero-img animate-float"
                        src={heroImg}
                        alt=""
                    />
                </div>
                <div className="hc-hero-wash" />
            </div>

            <div className="hc-hero-content">
                <p className="hc-hero-brand animate-fade-up">HappyCart</p>
                <h1 className="hc-hero-title animate-fade-up-delay">
                    Quality electronics, without the noise.
                </h1>
                <p className="hc-hero-copy animate-fade-up-delay-2">
                    Shop gadgets and home tech chosen for feel, finish, and everyday reliability.
                </p>
                <div className="hc-hero-actions animate-fade-up-delay-2">
                    <NavLink to="/shop" className="btn-primary">
                        Shop now
                    </NavLink>
                    <NavLink to="/about" className="btn-ghost">
                        Our story
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default Hero;
