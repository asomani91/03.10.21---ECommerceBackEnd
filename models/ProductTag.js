const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    product_tag_id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,      
    },
    product_id:{
      type:DataTypes.INTEGER,
      id: {
        type: DataTypes.INTEGER,
        references: 'Product', // <<< Note, its table's name, not object name
        referencesKey: 'product_id' // <<< Note, its a column name
  }
},
  tag_id:{
    type:DataTypes.INTEGER,
    id: {
      type: DataTypes.INTEGER,
      references: 'Tag', // <<< Note, its table's name, not object name
      referencesKey: 'tag_id' // <<< Note, its a column name
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
