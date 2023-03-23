const router = require("express").Router();
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
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

module.exports = router;
