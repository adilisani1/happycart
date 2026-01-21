const express = require("express");
const { loginUser, registerUser, forgotPassword, resetPassword } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

module.exports = userRouter;
