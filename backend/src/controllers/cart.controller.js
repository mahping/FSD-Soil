const db = require("../database");

exports.getCart = async (req, res) => {
  const cartItems = await db.cart.findAll({ where: { userId: req.params.userId }, include: [db.product] });
  res.json(cartItems);
};

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const cartItem = await db.cart.findOne({ where: { userId, productId } });

  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    await db.cart.create({ userId, productId, quantity });
  }

  res.status(201).json({ message: "Item added to cart" });
};

exports.updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const cartItem = await db.cart.findOne({ where: { userId, productId } });

  if (cartItem) {
    cartItem.quantity = quantity;
    await cartItem.save();
    res.json({ message: "Cart item updated" });
  } else {
    res.status(404).json({ message: "Item not found in cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  await db.cart.destroy({ where: { userId, productId } });
  res.json({ message: "Item removed from cart" });
};