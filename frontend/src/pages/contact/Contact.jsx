import React, { useState } from "react";
import { MdOutlineEmail, MdOutlineSubject } from "react-icons/md";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact Form Submitted", formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const fields = [
        { id: "name", label: "Your Name", type: "text", icon: <FiUser />, placeholder: "John Doe" },
        { id: "email", label: "Email Address", type: "email", icon: <MdOutlineEmail />, placeholder: "john@example.com" },
        { id: "subject", label: "Subject", type: "text", icon: <MdOutlineSubject />, placeholder: "How can we help?" },
    ];

    return (
        <div className="contact-page">
            {/* Background blobs */}
            <div className="absolute z-[0] w-[50%] h-[60%] -left-[20%] rounded-full blue__gradient top-[-10%] pointer-events-none" />
            <div className="absolute z-[0] w-[40%] h-[40%] -right-[10%] rounded-full pink__gradient bottom-[10%] pointer-events-none" />

            <div className="contact-inner relative z-[1] max-w-screen-2xl mx-auto px-5 md:px-10">

                {/* Header */}
                <div className="contact-header">
                    <span className="contact-tag">Get In Touch</span>
                    <h1 className="contact-title">Contact <span className="contact-gradient-text">Us</span></h1>
                    <p className="contact-subtitle">
                        Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Info Cards */}
                    <div className="contact-info">
                        {[
                            { emoji: "📧", title: "Email Us", desc: "support@happycart.com", sub: "We reply within 24 hours" },
                            { emoji: "📞", title: "Call Us", desc: "+1 (800) 123-4567", sub: "Mon–Fri, 9am – 6pm" },
                            { emoji: "📍", title: "Visit Us", desc: "123 Tech Avenue", sub: "San Francisco, CA 94107" },
                        ].map((card, i) => (
                            <div key={i} className="contact-info-card bg-black-gradient-2">
                                <span className="contact-info-icon">{card.emoji}</span>
                                <div>
                                    <h3>{card.title}</h3>
                                    <p className="contact-info-main">{card.desc}</p>
                                    <p className="contact-info-sub">{card.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="contact-form-card bg-black-gradient">
                        <form onSubmit={handleSubmit} className="contact-form">
                            {fields.map(({ id, label, type, icon, placeholder }) => (
                                <div key={id} className="contact-field">
                                    <label htmlFor={id}>
                                        <span className="contact-field-icon">{icon}</span>
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        id={id}
                                        name={id}
                                        value={formData[id]}
                                        onChange={handleInputChange}
                                        placeholder={placeholder}
                                        required
                                    />
                                </div>
                            ))}

                            <div className="contact-field">
                                <label htmlFor="message">
                                    <span className="contact-field-icon"><FiMessageSquare /></span>
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Tell us how we can help you..."
                                    rows="5"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={`contact-submit bg-blue-gradient hover:bg-light-gradient text-white ${submitted ? "submitted" : ""}`}
                            >
                                {submitted ? "✓ Message Sent!" : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;