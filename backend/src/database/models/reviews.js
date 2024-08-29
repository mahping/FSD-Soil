module.exports = (sequelize, DataTypes) =>
  sequelize.define("reviews", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: Product,
      //   key: 'id'
      // }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // references: {
      //   model: User,
      //   key: 'username'
      // }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Review',
    timestamps: false
  }
);
