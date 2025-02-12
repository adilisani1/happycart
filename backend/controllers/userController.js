const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    const token = createToken(user._id);
    res
      .status(200)
      .json({ success: true, message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login user" });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //   if (!name || !email || !password) {
  //     return res.status(400).json({ message: "All fields are required" });
  //   }

  // Check if email is valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  // Check if password is strong enough
  if (!validator.isStrongPassword(password)) {
    return res
      .status(400)
      .json({ success: false, message: "Password is not strong enough" });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to register user" });
  }
};
module.exports = { loginUser, registerUser };
