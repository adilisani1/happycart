import React, { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/products/all");
            setList(response.data || response);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    const handleRemove = async (foodId) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/products/remove`, { id: foodId });
            await fetchList();
            toast.success(response.data.message || "Product removed successfully");


        } catch (error) {
            console.error("Error removing product:", error);
            toast.error("Failed to remove product. Please try again.");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list add flex-col">
            <h1 className="list-title">Product List</h1>
            {list.length === 0 ? (
                <p className="list-empty">No products available.</p>
            ) : (
                <div className="list-table">
                    <div className="list-table-format title">
                        <b className="">Image</b>
                        <b className="">Name</b>
                        <b className="">Category</b>
                        <b className="">Price</b>
                        <b className="">Action</b>
                    </div>
                    {/* Table Body */}
                    {list.map((item, index) => (
                        <div key={index} className="list-table-format ">
                            <img
                                src={`http://localhost:4000/images/${item.image[0]}`}
                                alt={item.title}
                                className="list-image"
                            />
                            <p className="product-title">{item.title}</p>
                            <p className="product-category">{item.category}</p>
                            <p className="product-price">${item.price}</p>
                            <p className="cross" onClick={() => handleRemove(item._id)}>X</p>

                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
};

export default List;
