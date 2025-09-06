const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const { getDashboardStats } = require("../controllers/dashboardController");

router.get("/stats", protect, getDashboardStats);

module.exports = router;