const router = require("express").Router();
const { getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/profile", protect, getUsers);
router.get("/profile/:id", protect, getUserById);
router.put("/profile/:id", protect, updateUser);
router.delete("/profile/:id", protect, deleteUser);

module.exports = router;