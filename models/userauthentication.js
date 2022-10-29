'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAuthentication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAuthentication.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserAuthentication',
  });
  return UserAuthentication;
};