const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { protect } = require("../middlewares/authMiddleware");

// @route GET /api.users/profile
// @desc Get user profile (Protected)
// @access Private
router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch(err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;