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
    static associate({Movie, MovieReviews, UserAuthentication, Role}) {
      this.belongsToMany(Movie, {through: 'MovieReviews', foreignKey: 'userId', as: "movies" })
      this.hasMany(MovieReviews, {foreignKey:'userId', as: 'user_reviews'})
      this.belongsTo(UserAuthentication, {foreignKey: 'authId', as: 'user_auths'})
      this.belongsTo(Role, {foreignKey: 'roleId', as: "role"})
    }
  }
  UserProfile.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_profiles',
    modelName: 'UserProfile',
  });
  return UserProfile;
};