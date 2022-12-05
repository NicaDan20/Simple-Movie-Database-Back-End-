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
      path_to_image: null,
      bio: "Martin Scorsese is an American film director, producer, screenwriter and actor. He is the recipient of many major accolades, including an Academy Award, a Grammy Award, three Emmy Awards, four British Academy Film Awards, two Directors Guild of America Awards, an AFI Life Achievement Award and the Kennedy Center Honor in 2007. Five of his films have been inducted into the National Film Registry by the Library of Congress as culturally, historically or aesthetically significant.",
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
