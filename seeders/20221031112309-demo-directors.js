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
      birth_date: '17-11-1942',
      path_to_image: 'images/uploads/directors/scorsese.jpg',
      bio: "Martin Scorsese is an American film director, producer, screenwriter and actor. He is the recipient of many major accolades, including an Academy Award, a Grammy Award, three Emmy Awards, four British Academy Film Awards, two Directors Guild of America Awards, an AFI Life Achievement Award and the Kennedy Center Honor in 2007. Five of his films have been inducted into the National Film Registry by the Library of Congress as culturally, historically or aesthetically significant.",
      slug: 'martin-scorsese-1234',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      uuid: "9b2994e0-c5d6-478f-b757-2243d89a7e73",
      name: 'Peter Jackson',
      birth_date: '31-10-1961',
      path_to_image: 'images/uploads/directors/peter-jackson.jpg',
      slug: 'peter-jackson-1997',
      bio: "Sir Peter Robert Jackson ONZ KNZM (born 31 October 1961) is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. Other notable films include the critically lauded drama Heavenly Creatures (1994), the horror comedy The Frighteners (1996) and the epic monster remake film King Kong (2005)",
      createdAt: new Date(),
      updatedAt: new Date()  
    }, {
      uuid: "915ef5b6-12c7-4a25-802e-6ffd731dc4fa",
      name: 'Stanley Kubrick',
      birth_date: '26-07-1928',
      path_to_image: 'images/uploads/directors/stanley-kubrick.jpg',
      slug: 'stanley-kubrick-2001',
      bio: "Stanley Kubrick (July 26, 1928 – March 7, 1999) was an American film director, producer, screenwriter, and photographer. Widely considered one of the greatest filmmakers of all time, his films, almost all of which are adaptations of novels or short stories, cover a wide range of genres and are noted for their innovative cinematography, dark humor, realistic attention to detail and extensive set designs.",
      createdAt: new Date(),
      updatedAt: new Date()  
    }, {
      uuid: "46e5fb0d-55b8-40dd-826e-52f191194bba",
      name: 'Akira Kurosawa',
      birth_date: '23-03-1910',
      path_to_image: 'images/uploads/directors/akira-kurosawa.jpg',
      slug: 'akira-kurosawa-1998',
      bio: "Akira Kurosawa (March 23, 1910 – September 6, 1998) was a Japanese filmmaker and painter who directed thirty films in a career spanning over five decades. He is widely regarded as one of the most important and influential filmmakers in the history of cinema. Kurosawa displayed a bold, dynamic style, strongly influenced Western cinema yet distinct from it; he was involved with all aspects of film production.",
      createdAt: new Date(),
      updatedAt: new Date()  
    }, {
      uuid: "d91e6b97-268d-4a65-9f2f-0e16dbcf8c8a",
      name: 'Francis Ford Coppola',
      birth_date: '7-04-1939',
      path_to_image: 'images/uploads/directors/francis-ford-coppola.jpg',
      slug: 'francis-ford-coppola-1939',
      bio: "Francis Ford Coppola (born April 7 1939) is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s.[5] Coppola is the recipient of five Academy Awards, six Golden Globe Awards, two Palmes d'Or, and a British Academy Film Award (BAFTA).",
      createdAt: new Date(),
      updatedAt: new Date()  
    }, {
      uuid: "a3b99729-f256-4ab7-a7d9-9816b6e1c5f0",
      name: 'Sergio Leone',
      birth_date: '3-1-1929',
      path_to_image: 'images/uploads/directors/sergio-leone.jpg',
      slug: 'sergio-leone-1929',
      bio: "Sergio Leone (3 January 1929 – 30 April 1989) was an Italian film director, producer and screenwriter credited as the pioneer of the Spaghetti Western genre and widely regarded as one of the most influential directors in the history of cinema. Leone's film-making style includes juxtaposing extreme close-up shots with lengthy long shots. His movies include the Dollars Trilogy of Westerns featuring Clint Eastwood: A Fistful of Dollars (1964), For a Few Dollars More (1965), and The Good, the Bad and the Ugly (1966); and the Once Upon a Time films: Once Upon a Time in the West (1968), Duck, You Sucker! (1971), and Once Upon a Time in America (1984)",
      createdAt: new Date(),
      updatedAt: new Date()  
    }, {
      uuid: "cb23a35e-d06e-4217-a8ac-d0c73b68db81",
      name: 'James Cameron',
      birth_date: '16-08-1954',
      path_to_image: 'images/uploads/directors/james-cameron.jpeg',
      slug: 'james-cameron-2002',
      bio: "James Francis Cameron CC (born August 16, 1954) is a Canadian filmmaker. A major figure in the post-New Hollywood era, he is considered one of the industry's most innovative filmmakers, regularly pushing the boundaries of cinematic capability with his use of novel technologies. Cameron holds the achievement of having directed the first two of the five films in history to gross over $2 billion worldwide. In 2010, Time named Cameron as one of the 100 most influential people in the world.",
      createdAt: new Date(),
      updatedAt: new Date()  
    }, {
      uuid: "aeb91b81-0666-49f5-bfa0-61e6634bba9a",
      name: 'Andrei Tarkowsky',
      birth_date: '04-04-1932',
      path_to_image: 'images/uploads/directors/andrei-tarkowsky.jpeg',
      slug: 'andrei-tarkowski-1987',
      bio: "Andrei Arsenyevich Tarkovsky (4 April 1932 – 29 December 1986) was a Soviet filmmaker. Widely considered one of the greatest and most influential filmmakers of all time, his films explore spiritual and metaphysical themes, and are noted for their slow pacing and long takes, dreamlike visual imagery, and preoccupation with nature and memory. In 1990, he was posthumously awarded the Soviet Union's prestigious Lenin Prize. Three of his films—Andrei Rublev, Mirror, and Stalker—featured in Sight & Sound's 2012 poll of the 100 greatest films of all time.",
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


