'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Movie}) {
      this.belongsToMany(Movie, {through: 'MovieReviews', foreignKey: 'userId', as: "user_reviews" })
    }
  }
  UserProfile.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {
    sequelize,
    tableName: 'user_profiles',
    modelName: 'UserProfile',
  });
  return UserProfile;
};