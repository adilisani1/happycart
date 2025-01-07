const Product = require("../models/productModel");
const fs = require("fs");
const addProducts = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        ratings: req.body.ratings,
        trendy: req.body.trendy,
        featured: req.body.featured,
        description: req.body.description,
        image: image_filename,
    });

    try {
        await product.save();
        res.status(200).send({ message: "Product added successfully" });
    } catch (error) {
        res.status(400).send({ message: "Failed to add product" });
    }
};

module.exports = { addProducts };