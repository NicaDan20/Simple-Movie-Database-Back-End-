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
      runtime: 146,
      genre: 'Crime',
      release_date: new Date(),
      path_to_cover: null,
      description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
      wiki: "Goodfellas (stylized GoodFellas) is a 1990 American biographical crime film directed by Martin Scorsese, written by Nicholas Pileggi and Scorsese, and produced by Irwin Winkler. It is a film adaptation of the 1985 nonfiction book Wiseguy by Pileggi. Starring Robert De Niro, Ray Liotta, Joe Pesci, Lorraine Bracco and Paul Sorvino, the film narrates the rise and fall of mob associate Henry Hill and his friends and family from 1955 to 1980. Scorsese initially titled the film Wise Guy and postponed making it; he and Pileggi later changed the title to Goodfellas. To prepare for their roles in the film, De Niro, Pesci and Liotta often spoke with Pileggi, who shared research material left over from writing the book. According to Pesci, improvisation and ad-libbing came out of rehearsals wherein Scorsese gave the actors freedom to do whatever they wanted. The director made transcripts of these sessions, took the lines he liked most and put them into a revised script, which the cast worked from during principal photography. Goodfellas premiered at the 47th Venice International Film Festival on September 9, 1990, where Scorsese was awarded with Silver Lion for Best Director, and was released in the United States on September 19, 1990, by Warner Bros. The film was made on a budget of $25 million, and grossed $47 million. Goodfellas received widespread critical acclaim upon release: the critical consensus on Rotten Tomatoes calls it arguably the high point of Martin Scorsese's career. The film was nominated for six Academy Awards, including Best Picture and Best Director, with Pesci winning for Best Supporting Actor. The film won five awards from the British Academy of Film and Television Arts, including Best Film and Best Director. Additionally, Goodfellas was named the year's best film by various critics' groups. Goodfellas is widely regarded as one of the greatest films ever made, particularly in the gangster genre. In 2000, it was deemed culturally, historically, or aesthetically significant and selected for preservation in the National Film Registry by the United States Library of Congress.[4][5] Its content and style have been emulated in numerous other films and television series.[6]",      
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
