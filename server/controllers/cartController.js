// Import the Cart model
const Cart = require("../models/Cart");

// Create a new cart
exports.createNewCart = async (req, res) => {
  // Create a new cart instance with the request body data
  const newCart = new Cart(req.body);

  try {
    // Save the new cart to the database
    const savedCart = await newCart.save();
    // If successful, send the saved cart as a JSON response with status code 201
    res.status(201).json(savedCart);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// Update an existing cart
exports.updateCart = async (req, res) => {
  try {
    // Update the cart with the given ID using the request body data
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    // If successful, send the updated cart as a JSON response with status code 200
    res.status(200).json(updatedCart);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// Delete a cart
exports.deleteCart = async (req, res) => {
  try {
    // Delete the cart with the given ID from the database
    await Cart.findByIdAndDelete(req.params.id);

    // If successful, send a success message as a JSON response with status code 200
    res.status(200).json("Cart has been deleted");
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// Get a user's cart
exports.getCart = async (req, res) => {
  try {
    // Find the cart with the given user ID from the database
    const cart = await Cart.findOne({ userId: req.params.userId });

    // If successful, send the found cart as a JSON response with status code 200
    res.status(200).json(cart);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// Get all carts
exports.getAllCarts = async (req, res) => {
  try {
    // Find all carts from the database
    const carts = await Cart.find();

    // If successful, send the found carts as a JSON response with status code 200
    res.status(200).json(carts);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};
