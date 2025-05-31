require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const authMiddleware = require("../middleware/auth");
const authController = require('../controllers/auth.controller');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

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
