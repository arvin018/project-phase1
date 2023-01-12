'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      desciption: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories', 
          key: 'id'
        }
      },
      CompanyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies', 
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
   down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Products');
  }
};