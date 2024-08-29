module.exports = (express, app) => {
  const controller = require("../controllers/reviews.controller.js");
  const router = express.Router();

  // Get all reviews for a specific product
  router.get("/:productId", controller.all);

  // Add a new review
  router.post("/", controller.add);

  // Update an existing review
  router.put("/:reviewId", controller.update);

  // Delete an existing review
  router.delete("/:reviewId", controller.delete);

  // Add routes to server
  app.use("/api/reviews", router);
};
