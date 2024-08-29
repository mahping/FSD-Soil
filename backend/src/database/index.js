const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.reviews = require("./models/reviews.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.admin = require("./models/admin.js")(db.sequelize, DataTypes);

// Relate reviews and user.
db.reviews.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });
db.cart.belongsTo(db.user, { foreignKey: 'user_id' });
db.cart.belongsTo(db.product, { foreignKey: 'product_id' });


// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

// Seed data.
async function seedData() {
  const productCount = await db.product.count();


  // Seed products if none exist
  if (productCount === 0) {
    const products = [
      { name: 'Tomato', description: 'Fresh and organic tomatoes', price: 7.27, is_special: true },
      { name: 'Banana', description: 'Organic bananas', price: 8.99, is_special: true },
      { name: 'Cucumber', description: 'Fresh cucumbers', price: 6.99, is_special: true },
      { name: 'Orange', description: 'Juicy oranges', price: 5.99, is_special: true },
      { name: 'Capsicum', description: 'Fresh capsicums', price: 4.20, is_special: true },
      { name: 'Strawberry', description: 'Sweet strawberries', price: 3.99, is_special: true },
    ];

    await db.product.bulkCreate(products);
  }
}

module.exports = db;