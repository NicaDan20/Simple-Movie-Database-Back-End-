'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('directors', {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false  
      },
      date_of_death: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null
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
    await queryInterface.dropTable('directors');
  }
};