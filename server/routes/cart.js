// Import the required modules
const router = require("express").Router();
const {
  verifyTokenAndIsAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("./verifyToken");
const {
  createNewCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
} = require("../controllers/cartController");

// Define the routes and their corresponding handlers
router.post("/", verifyToken, createNewCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getCart);
router.get("/", verifyTokenAndIsAdmin, getAllCarts);

module.exports = router;
