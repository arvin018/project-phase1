'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //kalau belong to ga perlu     => User.belongsTo(models.Profile)
      User.hasMany(models.Transaction)
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    typeUser: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};