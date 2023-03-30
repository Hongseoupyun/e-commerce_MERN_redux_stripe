// Import the required modules
const router = require("express").Router();
const {
  verifyTokenAndIsAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("./verifyToken");
const {
  createNewOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getIncome,
} = require("../controllers/orderController");

// Define the routes and their corresponding handlers
router.post("/", verifyToken, createNewOrder);
router.put("/:id", verifyTokenAndAuthorization, updateOrder);
router.delete("/:id", verifyTokenAndAuthorization, deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, getOrder);
router.get("/", verifyTokenAndIsAdmin, getAllOrders);
router.get("/income", verifyTokenAndIsAdmin, getIncome);

module.exports = router;
