'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('movies', {
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
        allowNull: false
      },
      wiki: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },  
      release_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      path_to_cover: {
        type: DataTypes.STRING,
        allowNull: true
      },  
      slug: {
        type: DataTypes.STRING,
        unique: true
      },
      directorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        default: 0
      },
      rating_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('movies');
  }
};