const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const generateToken = require("../utils/generateToken");
const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Profile route
router.get("/profile", protect, getProfile);

module.exports = router;
