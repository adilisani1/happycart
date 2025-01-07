
const express = require('express');
const { addProducts } = require('../controllers/productController');
const multer = require('multer');
const productRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

productRouter.post('/add', upload.single('image'), addProducts);

module.exports = productRouter;