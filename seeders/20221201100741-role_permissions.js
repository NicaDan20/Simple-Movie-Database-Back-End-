'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('role_permissions', [{
      roleId: 1,
      permissionId: 1
    }, {
      roleId: 1,
      permissionId: 2
    }, {
      roleId: 1,
      permissionId: 3
    }, {
      roleId: 1,
      permissionId: 4
    }, {
      roleId: 1,
      permissionId: 5
    }, {
      roleId: 1,
      permissionId: 6
    }, {
      roleId: 1,
      permissionId: 7
    }, {
      roleId: 1,
      permissionId: 8
    }, {
      roleId: 1,
      permissionId: 9
    }, {
      roleId: 1,
      permissionId: 10
    }, {
      roleId: 1,
      permissionId: 11
    }, {
      roleId: 1,
      permissionId: 12
    }, 
    {
      roleId: 1,
      permissionId: 13
    },{
      roleId: 2,
      permissionId: 1
    }, {
      roleId: 2,
      permissionId: 2
    }, {
      roleId: 2,
      permissionId: 11
    }, {
      roleId: 2,
      permissionId: 12
    }, {
      roleId: 3,
      permissionId: 11
    }, {
      roleId: 3,
      permissionId: 12
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('role_permissions', null, {})
  }
};
