'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieReviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Movie, UserProfile}) {
    }
  }
  MovieReviews.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    review_title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    isFavourite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'movie_reviews',
    modelName: 'MovieReviews',
  });
  return MovieReviews;
};