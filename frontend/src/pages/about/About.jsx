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
        { value: '10K+', label: 'Happy customers' },
        { value: '500+', label: 'Products' },
        { value: '98%', label: 'Satisfaction' },
        { value: '24/7', label: 'Support' },
    ];

    return (
        <div className="about-page">

            <section className="about-intro">
                <div className="about-intro-inner">
                    <nav className="about-breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <span className="active">About</span>
                    </nav>

                    <div className="about-intro-grid">
                        <div className="about-intro-copy">
                            <p className="about-kicker">Our story</p>
                            <h1 className="about-intro-title">About HappyCart</h1>
                            <p className="about-intro-lead">
                                We started HappyCart for people who want good electronics without the loud sales pitch.
                            </p>
                            <p className="about-intro-body">
                                Every product we stock is chosen for everyday use — solid build, clear pricing, and support that answers when you need it. No clutter. No gimmicks. Just tech that feels considered.
                            </p>
                        </div>

                        <div className="about-intro-media">
                            <img src={TopImage} alt="HappyCart about" />
                        </div>
                    </div>
                </div>

                <div className="stats-bar">
                    {stats.map((s, i) => (
                        <div className="stat-item" key={i}>
                            <span className="stat-value">{s.value}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="about-craft">
                <div className="about-craft-inner">
                    <div className="craft-image-wrap">
                        <div className="craft-img-card">
                            <img src={SectionTwoImage} alt="Our products" />
                        </div>
                        <div className="craft-badge">
                            <div>
                                <strong>Since 2024</strong>
                                <p>Built for everyday tech</p>
                            </div>
                        </div>
                    </div>
                    <div className="craft-content">
                        <span className="section-tag">How we work</span>
                        <h2 className="craft-title">
                            Curated gear, <span className="gradient-text">honest service</span>
                        </h2>
                        <p className="craft-desc">
                            We partner with makers we trust and keep the buying path simple — browse, compare, and check out without noise. Our team keeps refining the catalog so what you see is what you can rely on.
                        </p>
                        <ul className="craft-features">
                            <li><span className="check-icon">✓</span> Premium quality products</li>
                            <li><span className="check-icon">✓</span> Expert customer support</li>
                            <li><span className="check-icon">✓</span> Fast &amp; secure delivery</li>
                        </ul>
                        <Link to="/shop" className="about-text-link">Browse the shop →</Link>
                    </div>
                </div>
            </section>

            <section className="about-banner">
                <div className="banner-img-wrap">
                    <img src={SectionThreeImage} alt="Smart devices" />
                    <div className="banner-overlay" />
                </div>
                <div className="banner-content">
                    <span className="section-tag light">What we believe</span>
                    <h2 className="banner-title">
                        Tech should feel <span className="orange-text">personal</span>
                    </h2>
                    <p className="banner-desc">
                        From phones to wearables, we focus on pieces that fit real routines — not just feature lists.
                    </p>
                </div>
            </section>

            <section className="about-team">
                <div className="team-header">
                    <span className="section-tag">The people</span>
                    <h2 className="team-title">Meet the <span className="gradient-text">team</span></h2>
                    <p className="team-subtitle">The people behind the catalog, support, and day-to-day experience.</p>
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
