require("dotenv").config();

const express = require("express");
const User = require("../models/User.model");
const authMiddleware = require("../middleware/auth");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

// ✅ Protected route
router.get("/me", async (req, res) => {
  try {
    // const user = await User.findById(req.user).select("-password");
    // res.json(user);
    // console.log("hey");
    res.json({ message: "Hello from Backend 👋" });
  } catch (err) {
    res.json(err);
  }
});

router.post("/greet", async (req, res) => {
  try {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}! 👋` });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
