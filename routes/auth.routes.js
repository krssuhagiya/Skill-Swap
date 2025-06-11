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
router.get("/me", authMiddleware, authController.getUser); 

module.exports = router;
