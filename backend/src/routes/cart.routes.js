module.exports = (express, app) => {
    const controller = require("../controllers/cart.controller.js");
    const router = express.Router();
    
    // Select all products.
    router.get("/:userId", controller.getCart);
    
    // Select a single product with id.
    router.post("/", controller.addToCart);
    
    // Create a new product.
    router.put("/", controller.updateCartItem);
    
    // Update an existing product with id.
    router.delete("/", controller.removeFromCart);
    
    // Add routes to server.
    app.use("/api/cart", router);
}