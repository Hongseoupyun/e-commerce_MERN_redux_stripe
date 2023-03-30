// Import the required modules
const router = require("express").Router();
const { signup, signin } = require("../controllers/authController");

// Define the routes and their corresponding handlers
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
