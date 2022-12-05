'use strict';

const { marked } = require('marked')
const { JSDOM } = require('jsdom')
const createDomPurify = require('dompurify')
const domPurify = createDomPurify(new JSDOM().window)

marked.setOptions({
  gfm: true,
  breaks: true
})

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
      this.belongsTo(Movie, {foreignKey: 'movieId', as:'movie_reviews'})
      this.belongsTo(UserProfile, {foreignKey: 'userId', as:'user_reviews'})
    }
  }
  MovieReviews.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    review_body: {
      type: DataTypes.TEXT,
      allowNull: true,
      set(value) {
        if (value !== null) {
          this.setDataValue('review_body', domPurify.sanitize(marked.parseInline(value)))
        }
      }
    },
    review_title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'movie_reviews',
    modelName: 'MovieReviews',
  });
  return MovieReviews;
};