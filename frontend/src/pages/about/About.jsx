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
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    const stats = [
        { value: '10K+', label: 'Happy Customers' },
        { value: '500+', label: 'Products' },
        { value: '98%', label: 'Satisfaction Rate' },
        { value: '24/7', label: 'Support' },
    ];

    return (
        <div className="about-page">

            {/* ── Hero Section ── */}
            <section className="about-hero">
                <div className="about-hero-bg" />
                <div className="about-hero-inner container mx-auto">

                    <div className="about-hero-text">
                        <nav className="about-breadcrumb" aria-label="Breadcrumb">
                            <Link to="/">Home</Link>
                            <span>/</span>
                            <span className="active">About Us</span>
                        </nav>

                        <h1 className="about-hero-title">
                            We're Building the <br />
                            <span className="gradient-text">Future of Tech</span>
                        </h1>
                        <p className="about-hero-desc">
                            Welcome to Happy Cart — your destination for cutting-edge electronics. We're dedicated to delivering the best products and experiences to our valued customers.
                        </p>
                        <div className="about-hero-actions">
                            <Link to="/shop">
                                <button className="bg-blue-gradient hover:bg-light-gradient text-white about-btn-primary">Explore Products</button>
                            </Link>
                            <Link to="/contact">
                                <button className="about-btn-outline">Contact Us</button>
                            </Link>
                        </div>
                    </div>
                    <div className="about-hero-image">
                        <div className="hero-img-glow" />
                        <img src={TopImage} alt="About Us" />
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="stats-bar">
                    {stats.map((s, i) => (
                        <div className="stat-item" key={i}>
                            <span className="stat-value">{s.value}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Craft Section ── */}
            <section className="about-craft">
                <div className="about-craft-inner">
                    <div className="craft-image-wrap">
                        <div className="craft-img-card">
                            <img src={SectionTwoImage} alt="Our Products" />
                        </div>
                        <div className="craft-badge">
                            <span>🏆</span>
                            <div>
                                <strong>Award Winning</strong>
                                <p>Best Tech Store 2024</p>
                            </div>
                        </div>
                    </div>
                    <div className="craft-content">
                        <span className="section-tag">Our Story</span>
                        <h2 className="craft-title">
                            We Craft Awesome <br />
                            <span className="gradient-text">With Great Experience</span>
                        </h2>
                        <p className="craft-desc">
                            Our company is a leading provider of cutting-edge technology. We are dedicated to providing the best experience to our customers, with a team of experts constantly innovating to improve our products and services.
                        </p>
                        <ul className="craft-features">
                            <li><span className="check-icon">✓</span> Premium quality products</li>
                            <li><span className="check-icon">✓</span> Expert customer support</li>
                            <li><span className="check-icon">✓</span> Fast & secure delivery</li>
                        </ul>
                        <Link to="/shop">
                            <button className="bg-blue-gradient hover:bg-light-gradient text-white about-btn-primary">View Products</button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Smart Fashion Banner ── */}
            <section className="about-banner">
                <div className="banner-img-wrap">
                    <img src={SectionThreeImage} alt="Smart Fashion" />
                    <div className="banner-overlay" />
                </div>
                <div className="banner-content">
                    <span className="section-tag light">Featured</span>
                    <h2 className="banner-title">
                        Smart Fashion <br />
                        <span className="orange-text">With Smart Devices</span>
                    </h2>
                    <p className="banner-desc">Where style meets technology in perfect harmony.</p>
                    <Link to="/shop">
                        <button className="btn-primary">Shop Now</button>
                    </Link>
                </div>
            </section>

            {/* ── Team Section ── */}
            <section className="about-team">
                <div className="team-header">
                    <span className="section-tag">The People</span>
                    <h2 className="team-title">Meet Our <span className="gradient-text">Dream Team</span></h2>
                    <p className="team-subtitle">Talented individuals passionate about technology and customer excellence.</p>
                </div>
                <div className="team-slider-wrap">
                    <Slider {...sliderSettings}>
                        {ourTeam.map((member, i) => (
                            <div key={i} className="team-slide">
                                <div className="team-card">
                                    <div className="team-card-top" />
                                    <div className="team-avatar-wrap">
                                        <img src={member.image} alt={member.name} className="team-avatar" />
                                    </div>
                                    <h3 className="team-name">{member.name}</h3>
                                    <p className="team-role">{member.role}</p>
                                    <p className="team-desc">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>

        </div>
    );
};

export default About;