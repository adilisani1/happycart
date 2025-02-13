const Product = require("../models/productModel");
const fs = require("fs");
const addProducts = async (req, res) => {
  // let image_filename = `${req.file.filename}`;

  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    ratings: 0,
    trendy: req.body.trendy,
    featured: req.body.featured,
    description: req.body.description,
    // image: image_filename,
    image: req.file.path, // Cloudinary URL
  });

  try {
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      imageUrl: req.file.path,
    });
  } catch (error) {
    res.status(400).send({ message: "Failed to add product" });
  }
};

const allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ message: "Failed to fetch products" });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (product.image && product.image.length > 0) {
      const imagePath = `uploads/${product.image[0]}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        }
      });
    }
    await Product.findByIdAndDelete(req.body.id);
    res
      .status(200)
      .send({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Failed to delete product" });
  }
};

module.exports = { addProducts, allProducts, deleteProduct };