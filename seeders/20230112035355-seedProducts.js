'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let seedData = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8', null))
    seedData = seedData.map((el) => {
        el.createdAt = new Date()
        el.updatedAt = new Date()
        return el
    })

    return queryInterface.bulkInsert('Products', seedData, null)
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, null)
  }
};
