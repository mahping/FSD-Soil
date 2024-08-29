const db = require("../database");

// Get all reviews for a specific product
exports.all = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.findAll({
      where: { productId }
    });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new review
exports.add = async (req, res) => {
  try {
    const { productId, username, comment, rating } = req.body;
    const newReview = await Review.create({ productId, username, comment, rating });
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an existing review
exports.update = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const { comment, rating } = req.body;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    review.comment = comment;
    review.rating = rating;
    await review.save();
    res.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an existing review
exports.delete = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    await review.destroy();
    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};