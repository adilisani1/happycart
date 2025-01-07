
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const connectDB = require('./config/db');
const productRouter = require('./routes/productRoute');


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

connectDB();

app.listen(port, () => {
    console.log(`Yourapp listening on port ${port}`)
})