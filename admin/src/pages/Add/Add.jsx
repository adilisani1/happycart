import React, { useState } from "react";
import axios from "axios";
import "./add.css";
import { assets } from "../../assets/assets";
import { toast } from 'react-toastify';

const Add = () => {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "Tablets",
        description: "",
        image: null,
        trendy: false,
        featured: false,
    });

    const categories = ["Smart TV", "Mobile Phone", "Smart Watch", "Computer and Laptop", "Tablets", "Gaming", "Headphones"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("title", formData.title);
        form.append("price", formData.price);
        form.append("category", formData.category);
        form.append("description", formData.description);
        form.append("trendy", formData.trendy);
        form.append("featured", formData.featured);
        form.append("image", formData.image);

        try {
            const response = await axios.post("http://localhost:4000/api/products/add", form);
            if (response.data.success) {
                setFormData({
                    title: "",
                    price: "",
                    category: "Tablets",
                    description: "",
                    image: null,
                    trendy: false,
                    featured: false,
                });
                toast.success(response.data.message || "Product added successfully");
            }
        } catch (error) {
            toast.error(error.response.data.message || "Failed to add product");
            console.error(error);
        }
    };

    return (
        <div className="add-product">
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            className="img-upload"
                            src={formData.image ? URL.createObjectURL(formData.image) : assets.upload_area}
                            alt="Upload"
                        />
                    </label>
                    <input
                        type="file"
                        id="image"
                        hidden
                        required
                        onChange={handleImageChange}
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Title</p>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="add-product-price flex-col">
                    <p>Price</p>
                    <input
                        type="text"
                        name="price"
                        placeholder="$200"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="add-category flex-col">
                    <p>Category</p>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="add-product-description flex-col">
                    <p>Description</p>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="5"
                    />
                </div>
                <div className="add-trend">
                    <label className="trend">
                        <div className="trendy">Trendy</div>
                        <input
                            className="check-box"
                            type="checkbox"
                            name="trendy"
                            checked={formData.trendy}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="featured">
                        <div className="feature">Featured</div>
                        <input
                            className="check-box"
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default Add;
