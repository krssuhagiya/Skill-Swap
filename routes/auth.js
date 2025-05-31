require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.get("/", (req, res) => {
  res.send("all users");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User is already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email or " });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid  or password" });

    // Create JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Send token as cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
      })
      .json({ msg: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").json({ msg: "Logged out successfully" });
});

// ✅ Protected route
router.get("/me", authMiddleware, async (req, res) => {
  try{ 
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch(err){
    res.json(err)
  }
});

module.exports = router;
