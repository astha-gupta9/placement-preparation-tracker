const router = require("express").Router();
const { createProblem, getProblems, updateProblem, deleteProblem, getProblemStats } = require("../controllers/problemController");
const { protect } = require("../middlewares/authMiddleware");

// All routes are protected
router.post("/", protect, createProblem);
router.get("/", protect, getProblems);
router.get("/stats", protect, getProblemStats);
router.put("/:id", protect, updateProblem);
router.delete("/:id", protect, deleteProblem);

module.exports = router;