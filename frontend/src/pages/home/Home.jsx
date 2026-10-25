import React from 'react';
import './home.css';
import Hero from '../../components/hero/Hero';
import { MdOutlineContactSupport } from "react-icons/md";
import { PiKeyReturn } from "react-icons/pi";
import { BsCreditCard2Front } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import Products from '../../components/products/Products';

const promiseItems = [
    {
        icon: <LiaShippingFastSolid />,
        title: "Free shipping",
        subtitle: "On orders over $50",
    },
    {
        icon: <PiKeyReturn />,
        title: "Easy returns",
        subtitle: "30-day peace of mind",
    },
    {
        icon: <BsCreditCard2Front />,
        title: "Secure pay",
        subtitle: "Cards & installments",
    },
    {
        icon: <MdOutlineContactSupport />,
        title: "Support 24/7",
        subtitle: "Real humans, always",
    },
];

const Home = () => {
    return (
        <section className="home-page">
            <Hero />

            <div className="promise-strip max-w-screen-2xl mx-auto px-5 md:px-10">
                {promiseItems.map((item, i) => (
                    <div key={i} className="promise-item">
                        <span className="promise-icon">{item.icon}</span>
                        <div className="promise-text">
                            <h3>{item.title}</h3>
                            <p>{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Products />
        </section>
    );
};

export default Home;
