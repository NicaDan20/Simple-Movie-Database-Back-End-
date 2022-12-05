'use strict';

const bcrypt = require('bcrypt')
const saltRounds = 11

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
      allowNull: false,
       set(value) {
       let salt = bcrypt.genSaltSync(saltRounds)
       let hash = bcrypt.hashSync(value, salt)
       this.setDataValue('password', hash)
      }
    }
  }, {
    sequelize,
    tableName: 'user_authentications',
    modelName: 'UserAuthentication',
  });
  return UserAuthentication;
};