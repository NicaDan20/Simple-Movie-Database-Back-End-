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
    static associate({UserProfile}) {
        this.hasMany(UserProfile, {foreignKey: 'authId', as: 'profiles'})
    }
  }
  UserAuthentication.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_authentications',
    modelName: 'UserAuthentication',
  });
  return UserAuthentication;
};