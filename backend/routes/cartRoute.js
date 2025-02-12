const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCartItems,
} = require("../controllers/cartController");
const authMiddleware = require("../middleware/auth");
const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCartItems);

module.exports = cartRouter;
