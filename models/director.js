'use strict';

const {prettyFormatDate, createDirectorSlug} = require('../functions/functions')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Director extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Movie }) {
      this.hasMany(Movie, { foreignKey: 'directorId', as: 'movies' })
    }
  }
  Director.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      get() {
        let date = new Date(this.getDataValue('birth_date'))
        return prettyFormatDate(date)
      }
    },
    date_of_death: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    bio: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    },
    path_to_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
        }
  }, {
    sequelize,
    hooks: {
      beforeValidate: (director, options) => {
        director.slug = createDirectorSlug(director.name, director.uuid)
      },
      beforeSave: (director, options) => {
        director.slug = createDirectorSlug(director.name, director.uuid)
      }
    },
    tableName: 'directors',
    modelName: 'Director',
  });
  return Director;
};