const express = require("express");
const { loginUser, registerUser, forgotPassword, resetPassword, getProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/profile", authMiddleware, getProfile);

module.exports = userRouter;
