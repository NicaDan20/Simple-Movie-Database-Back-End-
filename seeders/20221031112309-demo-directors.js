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

    await queryInterface.bulkInsert('directors', [{
      uuid: "d1904fc8-eddb-4766-b342-908be485a8d8",
      name: 'Martin Scorsese',
      birth_date: new Date(),
      path_to_image: 'public/images/directors/default.jpg',
      bio: "He's the great Martin Scorsese! So great!",
      slug: 'martin-scorsese-1234',
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
    await queryInterface.bulkDelete('directors', null, {})
  }
};
