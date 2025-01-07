const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    trendy: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: [String], 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;
