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
    }
  }
  Product.init({
    name: {
      type :DataTypes.STRING,
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
     type: DataTypes.STRING,
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
  return product;
};