'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let seedData = JSON.parse(fs.readFileSync('./data/categories.json', 'utf-8', null))
    seedData = seedData.map((el) => {
        el.createdAt = new Date()
        el.updatedAt = new Date()
        return el
    })

    return queryInterface.bulkInsert('Categories', seedData, null)
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, null)
  }
};
