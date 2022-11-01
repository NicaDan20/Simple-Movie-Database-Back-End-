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

    await queryInterface.bulkInsert('movies', [{
      uuid: "8899c78f-dd75-4b42-89eb-75265e807762",
      title: 'Goodfellas',
      genre: 'Crime',
      release_date: new Date(),
      path_to_cover: 'public/images/movies/default.jpg',
      description: "The goodfellas are back in town",
      slug: 'goodfellas-1234',
      directorId: 1,
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
    await queryInterface.bulkDelete('movies', null, {})
  }
};
