'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('permissions', [{
      permission: 'CAN POST REVIEWS',
    }, {
      permission: 'CAN UPDATE REVIEWS',
    },{
      permission: 'CAN APPROVE USERS',
    }, {
      permission: 'CAN BAN USERS',
    },{
      permission: 'CAN ADD MOVIES',
    },{
      permission: 'CAN REMOVE MOVIES',
    },{
      permission: 'CAN EDIT MOVIES',
    },{
      permission: 'CAN ADD DIRECTORS',
    },{
      permission: 'CAN EDIT DIRECTORS',
    },{
      permission: 'CAN REMOVE DIRECTORS',
    },{
      permission: 'CAN ADD FAVORITES',
    },{
      permission: 'CAN ADD TO WATCHLIST',
    }, {
      permission: "CAN ACCESS ADMIN PANEL"
    }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('permissions', null, {})
  }
};
