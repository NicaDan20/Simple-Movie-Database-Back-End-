'use strict';

const slugify = require('slugify')
const {generateUnique, prettyFormatDate} = require('../functions/functions')
const { marked } = require('marked')
const { JSDOM } = require('jsdom')
const createDomPurify = require('dompurify')
const domPurify = createDomPurify(new JSDOM().window)

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
    static associate({Director, UserProfile, MovieReviews}) {
      this.belongsTo(Director, { foreignKey: 'directorId', as: 'director'})
      this.belongsToMany(UserProfile, {through: 'MovieReviews', foreignKey: 'movieId', as: 'users'})
      this.hasMany(MovieReviews, {foreignKey: 'movieId', as:'movie_reviews'})
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
    runtime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    genre: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    wiki: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
      set(value) {
        if (value !== null) {
          this.setDataValue('wiki', domPurify.sanitize(marked(value)))
        }
      }

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
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0,
      get() {
        const rating = this.getDataValue('rating')
        return (Math.round(rating * 100) / 100).toFixed(2);
      }
    },
    rating_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    }
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