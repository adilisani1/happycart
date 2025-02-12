const User = require("../models/userModel");

// items add in the cart
const addToCart = async (req, res) => {
  try {
    const userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });

    res
      .status(200)
      .json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// remove items from the cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "Item removed from cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get cart items
const getCartItems = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { addToCart, removeFromCart, getCartItems };
