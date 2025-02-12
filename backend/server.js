
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
app.use(cors());

// Routes Connection
app.use("/api/products", productRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

connectDB();

app.listen(port, () => {
    console.log(`Yourapp listening on port ${port}`)
})