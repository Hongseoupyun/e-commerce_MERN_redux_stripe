// Import the Order model
const Order = require("../models/Order");

// Create a new order controller
exports.createNewOrder = async (req, res) => {
  // Create a new order instance with the request body data
  const newOrder = new Order(req.body);

  try {
    // Save the new order to the database
    const savedOrder = await newOrder.save();
    // If successful, send the saved order as a JSON response with status code 201
    res.status(201).json(savedOrder);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// Update order controller
exports.updateOrder = async (req, res) => {
  try {
    // Update the order with the given ID using the request body data
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    // If successful, send the updated order as a JSON response with status code 200
    res.status(200).json(updatedOrder);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// Delete order controller
exports.deleteOrder = async (req, res) => {
  try {
    // Delete the order with the given ID from the database
    await Order.findByIdAndDelete(req.params.id);

    // If successful, send a success message as a JSON response with status code 200
    res.status(200).json("Order has been deleted");
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// Get a user order controller
exports.getOrder = async (req, res) => {
  try {
    // Find the orders with the given user ID from the database
    const orders = await Order.find({ userId: req.params.userId });

    // If successful, send the found orders as a JSON response with status code 200
    res.status(200).json(orders);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// GET all orders controller
exports.getAllOrders = async (req, res) => {
  try {
    // Find all orders from the database
    const orders = await Order.find();

    // If successful, send the found orders as a JSON response with status code 200
    res.status(200).json(orders);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// Get monthly income controller
exports.getIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    // Calculate the income from the orders
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    // If successful, send the calculated income as a JSON response with status code 200
    res.status(200).json(income);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};
