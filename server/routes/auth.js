const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_PHARASE
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Sign in route
router.post("/signin", async (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  try {
    // Find user in the database using the provided username
    const user = await User.findOne({ username: username });

    // If the user is not found, return an error message
    if (!user) {
      return res.status(401).json("Wrong username");
    }

    // Decrypt the stored password using the secret phrase
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PHARASE
    );
    const passwordFromDB = hashedPassword.toString(CryptoJS.enc.Utf8);

    // If the input password does not match the decrypted password, return an error message
    if (password !== passwordFromDB) {
      return res.status(401).json("Wrong password");
    } else {
      // If the password matches, return the user information without the password
      const { password, ...others } = user._doc;

      // Create a token that will be used for authentication
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "5d",
        }
      );
      return res.status(200).json({ ...others, accessToken });
    }
  } catch (err) {
    // If there is an error during the process, return a server error message
    res.status(500).json(err);
  }
});

module.exports = router;
