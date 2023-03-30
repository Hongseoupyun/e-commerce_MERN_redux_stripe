// Import required modules
const User = require("../models/User");
const CryptoJS = require("crypto-js");

// Update user information handler
exports.updateUser = async (req, res) => {
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
exports.deleteUser = async (req, res) => {
  try {
    // Delete the user with the given id
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Find a single user handler (admin access only)
exports.findUser = async (req, res) => {
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
exports.getAllUsers = async (req, res) => {
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

// Get user stats handler (admin access only); How many users were created in each month of the last year
exports.getUserStats = async (req, res) => {
  // Get the current date
  const date = new Date();
  // Calculate the date one year ago from the current date
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    // Use MongoDB aggregation to perform a series of operations on the User documents
    const data = await User.aggregate([
      // Filter documents to only include those created within the last year
      { $match: { createdAt: { $gte: lastYear } } },
      // Create a new field 'month' containing the month number of the 'createdAt' field
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      // Group documents by the 'month' field and count the number of documents per group
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    // Send the aggregated data as the response
    res.status(200).json(data);
  } catch (err) {
    // If there is an error, send an error response
    res.status(500).json(err);
  }
};
