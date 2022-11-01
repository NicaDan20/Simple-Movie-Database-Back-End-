'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('movie_reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      review_body: {
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
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movie_reviews');
  }
};