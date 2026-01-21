// const mongoose = require('mongoose');

//  const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log(error);
//     }
// };

// module.exports = connectDB;
// config/db.js
require("dotenv").config(); // ← load .env so process.env.MONGO_URI is set
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;

// ←––––––– TEST INVOCATION –––––––→
if (require.main === module) {
  // This file was run directly (`node config/db.js`), so call the function:
  connectDB();
}
