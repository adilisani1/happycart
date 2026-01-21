
const express = require('express');
const {
  addProducts,
  allProducts,
  deleteProduct,
} = require("../controllers/productController");
const multer = require("multer");
const productRouter = express.Router();
const upload = require("../config/multer"); 



productRouter.post("/add", upload.single("image"), addProducts);
productRouter.get("/all", allProducts);
productRouter.post("/remove", deleteProduct);

module.exports = productRouter;



// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });