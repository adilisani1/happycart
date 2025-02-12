const Order = require("../models/orderModel");
const User = require("../models/userModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Placing user order for frontend...
const placeOrder = async (req, res) => {
  console.log("Stripe Secret Key:", process.env.STRIPE_SECRET);

  try {
    const { userId, items, amount, address } = req.body;

    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.title },
        unit_amount: Math.round(parseFloat(item.price) * 100),
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `http://localhost:5174/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `http://localhost:5174/verify?success=false&orderId=${newOrder._id}`,
      },
      {
        apiKey: process.env.STRIPE_SECRET.trim(),
      }
    );

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe API Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "Paid successfully" });
    } else {
      await Order.findOneAndDelete(orderId);
      res.status(200).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Stripe API Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

module.exports = {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
};
