import React, { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process the form submission
        console.log("Contact Form Submitted", formData);
    };

    return (
        <div className="min-h-screen  text-white py-16 pt-24 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
                <p className="text-center text-gray-400 mb-8">
                    Have a question or feedback? Fill out the form below, and we'll get back to you as soon as possible.
                </p>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            className="border border-gray-200 text-gray-300 rounded-lg px-4 py-3 outline-none bg-inherit"
                        />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="border border-gray-200 text-gray-300 rounded-lg px-4 py-3 outline-none bg-inherit"
                        />
                    </div>
                    {/* Subject */}
                    <div className="flex flex-col">
                        <label htmlFor="subject" className="mb-2 text-gray-300">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Enter the subject"
                            className="border border-gray-200 text-gray-300 rounded-lg px-4 py-3 outline-none bg-inherit"
                        />
                    </div>
                    {/* Message */}
                    <div className="flex flex-col">
                        <label htmlFor="message" className="mb-2 text-gray-300">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Enter your message"
                            rows="5"
                            className="border border-gray-200 text-gray-300 rounded-lg px-4 py-3 outline-none bg-inherit"
                        ></textarea>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full  bg-card-color-one hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
