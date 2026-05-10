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
        icon: <MdOutlineContactSupport />,
        title: "Support 24/7",
        subtitle: "Dedicated 24/7 Support",
    },
    {
        icon: <PiKeyReturn />,
        title: "Easy Returns",
        subtitle: "Shop With Confidence",
    },
    {
        icon: <BsCreditCard2Front />,
        title: "Card Payment",
        subtitle: "12 Months Installments",
    },
    {
        icon: <LiaShippingFastSolid />,
        title: "Free Shipping",
        subtitle: "Capped at $50 per order",
    },
];

const Home = () => {
    return (
        <section>
            <Hero />

            {/* OUR PROMISE */}
            <div className="promise-strip max-w-screen-2xl mx-auto px-5 md:px-10 mb-32">
                {promiseItems.map((item, i) => (
                    <div key={i} className="promise-card bg-black-gradient-2">
                        <span className="promise-icon">{item.icon}</span>
                        <div className="promise-text">
                            <h3>{item.title}</h3>
                            <p>{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* MAIN PRODUCTS */}
            <Products />
        </section>
    );
};

export default Home;