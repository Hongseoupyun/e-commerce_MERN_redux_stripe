// Import the required modules
const router = require("express").Router();
const { verifyTokenAndIsAdmin } = require("./verifyToken");
const {
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/productController");

// Define the routes and their corresponding handlers
router.post("/", verifyTokenAndIsAdmin, createNewProduct);
router.put("/:id", verifyTokenAndIsAdmin, updateProduct);
router.delete("/:id", verifyTokenAndIsAdmin, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getAllProducts);

module.exports = router;
