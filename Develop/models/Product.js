// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    product_id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,      
    },
    product_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    price:{
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      id: {
        type: DataTypes.INTEGER,
        references: 'Category', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name
  }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
