'use strict';

const bcrypt = require('bcrypt')
const saltRounds = 11

const password = '1234'

const salt = bcrypt.genSaltSync(saltRounds)
const hash = bcrypt.hashSync(password, salt)

const {uuid} = require('uuidv4')


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
     uuid: uuid(),
     createdAt: new Date(),
     updatedAt: new Date()
     }, {
      username: 'DXC',
      authId: '2',
      roleId: '2',
      uuid: uuid(),
      createdAt: new Date(),
      updatedAt: new Date() 
     }, {
      username: 'ZebraForever',
      authId: '3',
      roleId: '2',
      uuid: uuid(),
      createdAt: new Date(),
      updatedAt: new Date() 
     }, {
      username: 'Abulebister12',
      authId: '4',
      roleId: '2',
      uuid: uuid(),
      createdAt: new Date(),
      updatedAt: new Date() 
     }])
     await queryInterface.bulkInsert('user_authentications', [{
        email: 'danut.nica@gmail.com',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
        isBanned: false
     }, {
      email: 'senorbiceps@gmail.com',
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
      isBanned: false
     }, {
      email: 'elendilthebest@yahoo.com',
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
      isBanned: false
     }, {
      email: 'cr7iswashedkekX0r@gmail.com',
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
      isBanned: false
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
