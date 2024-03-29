// Import the Product model
const Product = require("../models/Product");

// Create a new product controller
exports.createNewProduct = async (req, res) => {
  // Create a new Product instance with the request body data
  const newProduct = new Product(req.body);

  try {
    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // If successful, send the saved product as a JSON response with status code 201
    res.status(201).json(savedProduct);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// Update product controller
exports.updateProduct = async (req, res) => {
  try {
    // Update the product with the given ID using the request body data
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    // If successful, send the updated product as a JSON response with status code 200
    res.status(200).json(updatedProduct);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// Delete product controller
exports.deleteProduct = async (req, res) => {
  try {
    // Delete the product with the given ID from the database
    await Product.findByIdAndDelete(req.params.id);

    // If successful, send a success message as a JSON response with status code 200
    res.status(200).json("Product has been deleted");
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// Get a single product controller
exports.getProduct = async (req, res) => {
  try {
    // Find the product with the given ID from the database
    const product = await Product.findById(req.params.id);

    // If successful, send the found product as a JSON response with status code 200
    res.status(200).json(product);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};

// GET all products controller
exports.getAllProducts = async (req, res) => {
  // Extract the 'new' and 'category' query parameters from the request
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    // If the query is 'new', return the 5 most recent products
    if (qNew) {
      // Find all products, sort them by 'createdAt' in descending order, and limit the result to 5 items
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      // If the query is 'category', return all products with the given category
      // Find all products whose 'categories' field contains the specified 'qCategory'
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      // If there are no query parameters, return all products
      products = await Product.find();
    }

    // If successful, send the found products as a JSON response with status code 200
    res.status(200).json(products);
  } catch (err) {
    // If there's an error, send the error message as a JSON response with status code 500
    res.status(500).json(err);
  }
};
