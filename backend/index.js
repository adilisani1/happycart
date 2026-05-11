const express = require('express');
const cors = require("cors");

// Database
const connectDB = require("./config/db");

// Routes
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: process.env.VITE_REACT_APP_FRONTEND_BASEURL,
    credentials: true,
  })
);

// Routes Connection
app.use("/api/products", productRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Ensure DB is connected for every request (cached after first connect)
app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

if (process.env.VERCEL) {
  module.exports = app;
} else {
  connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Yourapp listening on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Failed to start server:", err);
      process.exit(1);
    });
}
