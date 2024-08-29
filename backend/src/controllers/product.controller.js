const db = require("../database");

// Select all products from the database.
exports.all = async (req, res) => {
  try {
    const products = await db.product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Select one product from the database.
exports.one = async (req, res) => {
  try {
    const product = await db.product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a product in the database.
exports.create = async (req, res) => {
  try {
    const product = await db.product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      is_special: req.body.is_special
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product in the database.
exports.update = async (req, res) => {
  try {
    const product = await db.product.findByPk(req.params.id);
    if (product) {
      await product.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        is_special: req.body.is_special
      });
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product from the database.
exports.delete = async (req, res) => {
  try {
    const product = await db.product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
