module.exports = (express, app) => {
    const controller = require("../controllers/product.controller.js");
    const router = express.Router();
  
    // Select all products.
    router.get("/", controller.all);
  
    // Select a single product with id.
    router.get("/select/:id", controller.one);
  
    // Create a new product.
    router.post("/", controller.create);
  
    // Update an existing product with id.
    router.put("/update/:id", controller.update);
  
    // Delete a product with id.
    router.delete("/delete/:id", controller.delete);
  
    // Add routes to server.
    app.use("/api/products", router);
  };
  