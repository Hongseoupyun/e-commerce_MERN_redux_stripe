// Import required modules
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register route
router.post("/signup", async (req, res) => {
  // Extract username, email, and password from request body
  const { username, email, password } = req.body;

  // Encrypt the password using CryptoJS
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_PHARASE
  ).toString();

  // Create a new User instance with the encrypted password
  const newUser = new User({ username, email, password: encryptedPassword });

  try {
    // Save the new user to the database
    const savedUser = await newUser.save();
    // Send a response with status 201 (Created) and the saved user data
    res.status(201).json(savedUser);
  } catch (err) {
    // Send a response with status 500 (Internal Server Error) and the error
    res.status(500).json(err);
  }
});

// Sign in route
router.post("/signin", async (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  try {
    // Find the user in the database by username
    const user = await User.findOne({ username });

    // If the user is not found, send a response with status 401 (Unauthorized) and an error message
    if (!user) {
      return res.status(401).json("Wrong username");
    }

    // Decrypt the stored password using the secret phrase
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PHARASE
    ).toString(CryptoJS.enc.Utf8);

    // If the provided password does not match the decrypted password, send a response with status 401 (Unauthorized) and an error message
    if (password !== decryptedPassword) {
      return res.status(401).json("Wrong password");
    }

    // Create a JWT (JSON Web Token) for the authenticated user
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    // Remove the password from the user object
    const { password: _, ...userWithoutPassword } = user._doc;
    // Send a response with status 200 (OK) and the user data without the password along with the access token
    res.status(200).json({ ...userWithoutPassword, accessToken });
  } catch (err) {
    // Send a response with status 500 (Internal Server Error) and the error
    res.status(500).json(err);
  }
});

// Export the router to be used in other parts of the application
module.exports = router;