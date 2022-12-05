'use strict';

const bcrypt = require('bcrypt')
const saltRounds = 11

const password = '1234'

const salt = bcrypt.genSaltSync(saltRounds)
const hash = bcrypt.hashSync(password, salt)


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

     await queryInterface.bulkInsert('user_profiles', [{
     username: 'Admin',
     authId: '1',
     roleId: '1',
     uuid: 'ac6c073e-846a-4038-9221-c23d84ded474',
     createdAt: new Date(),
     updatedAt: new Date()
     }])

     await queryInterface.bulkInsert('user_authentications', [{
        email: 'danut.nica@gmail.com',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
     }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user_profiles', null, {})
    await queryInterface.bulkDelete('user_authentications', null, {})
  }
};
