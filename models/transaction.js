'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User),
      Transaction.belongsTo(models.Product)
    }
  }
  Transaction.init({
    ProductId: 
    {
      type :DataTypes.STRING,
      references: {
        model: 'Products', 
        key: 'id'
      }
    },
    UserId: {
     type: DataTypes.STRING,
     references: {
      model: 'Users', 
      key: 'id'
    }
    },
    invoice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  // ADD HOOK BUAT GENERATE INVOICE
  Transaction.addHook('beforeCreate', (transaction, options) => {
    let time = new Date().getTime()

    transaction.invoice = `OD-${ProductId}-${UserId}-${time}`
  })

  return Transaction;
};