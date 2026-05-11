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
const normalizeOrigin = (value) =>
  typeof value === "string" ? value.trim().replace(/\/+$/, "") : value;

const allowedOrigins = [
  process.env.VITE_REACT_APP_FRONTEND_BASEURL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "https://happycart-ashen.vercel.app",
]
  .map(normalizeOrigin)
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const normalized = normalizeOrigin(origin);
      if (allowedOrigins.includes(normalized)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Routes Connection
app.use("/api/products", productRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

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
