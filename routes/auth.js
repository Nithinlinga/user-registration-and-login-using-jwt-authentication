const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const User = require("../models/User");

const router = express.Router();

// Zod schema for email and password validation
const authSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
 
// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ msg: "Password is required" });
    }

    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists, Please Login" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token ,message: "User registered successfully" });
  } catch (err) {
    console.error("Error in register route:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ msg: "Password is required" });
    }
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email or Password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Email or Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token, message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Reset Password route
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ msg: "New password is required" });
    }

    const validation = authSchema.safeParse({ email, password: newPassword });
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found, Please enter a valid email" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ msg: "Password has been reset successfully, Please Login" });
  } catch (err) {
    console.error("Error in reset-password route:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
