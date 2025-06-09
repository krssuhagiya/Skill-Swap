const User = require('../models/User.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
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
}

exports.login = async (req, res) => {
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
}

exports.logout = (req, res) => {
  res.clearCookie("token").json({ msg: "Logged out successfully" });
}