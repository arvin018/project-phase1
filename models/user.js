'use strict';
const {
  Model
} = require('sequelize');

var bcrypt = require('bcryptjs');
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
    hook : {
      beforeCreate(instance, option) {
        console.log(instance, '<<<< ini before Create')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};