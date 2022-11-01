'use strict';

const slugify = require('slugify')
const {generateUnique, prettyFormatDate} = require('../functions/functions')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Director, UserProfile}) {
      this.belongsTo(Director, { foreignKey: 'directorId', as: 'director'})
      this.belongsToMany(UserProfile, {through: 'MovieReviews', foreignKey: 'movieId', as: 'movie_reviews'})
    }
  }
  Movie.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: { 
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    genre: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    },
    release_date: { 
      type: DataTypes.DATEONLY,
      allowNull: false,
      get() {
        let date = new Date(this.getDataValue('release_date'))
        return prettyFormatDate(date)
      }
    },
    path_to_cover: {
      type: DataTypes.STRING,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
  }, {
    sequelize,
    tableName: 'movies',
    modelName: 'Movie',
    hooks: {
      beforeValidate: (movie, options) => {

        movie.slug = generateUnique(slugify([movie.title, movie.uuid].join(' ')))
      }
    },
  });
  return Movie;
};