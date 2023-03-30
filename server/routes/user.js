// Import required modules
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndIsAdmin,
} = require("./verifyToken");
const {
  updateUser,
  deleteUser,
  findUser,
  getAllUsers,
  getUserStats,
} = require("../controllers/userController");

// Define the routes and their corresponding handlers
router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndIsAdmin, findUser);
router.get("/", verifyTokenAndIsAdmin, getAllUsers);
router.get("/stats", verifyTokenAndIsAdmin, getUserStats);

// Export the router to be used in other modules
module.exports = router;
