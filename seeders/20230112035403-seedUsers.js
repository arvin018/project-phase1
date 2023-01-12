'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let seedData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8', null))
    seedData = seedData.map((el) => {
        el.createdAt = new Date()
        el.updatedAt = new Date()
        delete el.id
        return el
    })

    return queryInterface.bulkInsert('Users', seedData, null)
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, null)
  }
};
