// Import required modules
const router = require("express").Router();
const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndIsAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");

// Update user information handler
const updateUser = async (req, res) => {
  // Destructure password and other user data from request body
  let { password, ...others } = req.body;

  // Encrypt the password if provided
  if (password) {
    password = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_PHARASE
    ).toString();
  }

  try {
    // Update the user with the new information
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { ...others, password } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete user handler
const deleteUser = async (req, res) => {
  try {
    // Delete the user with the given id
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Find a single user handler (admin access only)
const findUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // Remove password from user object
    const { password: _, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all users handler (admin access only)
const getAllUsers = async (req, res) => {
  const query = req.query.new;

  try {
    // Return either the 10 most recent users or all users based on the query parameter
    const allUsers = query
      ? await User.find().sort({ _id: -1 }).limit(10)
      : await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Define the routes and their corresponding handlers
router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndIsAdmin, findUser);
router.get("/", verifyTokenAndIsAdmin, getAllUsers);

// Export the router to be used in other modules
module.exports = router;
