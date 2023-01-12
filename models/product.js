'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Transaction),
      Product.belongsTo(models.Category),
      Product.belongsTo(models.Company)
    }
  }
  Product.init({
    name: {
      type :DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty:{
          msg:'name not empty'
        },
        notNull:{
          msg:'name not null'
        }
      }  
    },
    desciption: {
      type :DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'description not empty'
        },
        notNull:{
          msg:'description not null'
        }
      }
    },
    price: {
     type: DataTypes.INTEGER,
     allowNull:false,
     validate:{
      notEmpty:{
        msg:'price not empty'
      },
      notNull:{
        msg:'price not null'
      }
    }
    },
    CategoryId:{ 
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'categoryId not empty'
        },
        notNull:{
          msg:'categoryId not null'
        }
      },
      references: {
        model: 'Categories', 
        key: 'id'
      }
    },
    CompanyId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'companyId not empty'
        },
        notNull:{
          msg:'companyId not null'
        }
      },
      references: {
        model: 'Companies', 
        key: 'id'
      }
      
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};