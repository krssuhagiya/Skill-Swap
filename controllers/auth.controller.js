const User = require("../models/User.model");
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
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid  email or password" });

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send token as cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token").json({ msg: "Logged out successfully" });
};

exports.getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "No token, auth denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password"); // exclude password
    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
