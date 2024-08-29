module.exports = (express, app) => {
    const router = express.Router();
    const adminController = require("../controllers/admin.controller.js");
    
    // Route to get all users
    router.get('/users', adminController.getAllUsers);
    app.use('/api/admin', router);
};
