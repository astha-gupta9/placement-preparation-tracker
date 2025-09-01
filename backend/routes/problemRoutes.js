const router = require("express").Router();
const {
    createProblem,
    getProblems,
    updateProblem,
    deleteProblem
} = require("../controllers/problemController");
const { protect } = require("../middlewares/authMiddleware");

// All routes are protected
router.post("/", protect, createProblem);
router.get("/", protect, getProblems);
router.put("/:id", protect, updateProblem);
router.delete("/:id", protect, deleteProblem);

module.exports = router;