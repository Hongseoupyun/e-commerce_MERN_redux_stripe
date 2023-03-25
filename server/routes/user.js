const router = require("express").Router();
const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndIsAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");

//Update user information
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  let { password, ...others } = req.body;
  // Encrypt the password
  if (password) {
    password = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_PHARASE
    ).toString();
  }
  try {
    // Update the user information using the provided id and the new information
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...others, password },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete user

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // Delete the user using the provided id
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user info as an admin
router.get("/find/:id", verifyTokenAndIsAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password: _, ...others } = user._doc;
    res.status(200).json(others);
  } catch {
    res.status(500).json(err);
  }
});

// Get all users as an admin
router.get("/", verifyTokenAndIsAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const allUsers = query
      ? await User.find().sort({ _id: -1 }).limit(10)
      : await User.find();
    res.status(200).json(allUsers);
  } catch {
    res.status(500).json(err);
  }
});
module.exports = router;
