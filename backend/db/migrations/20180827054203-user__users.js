"use strict";
const tableName = "user__users";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      login: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      nick: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      salt: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  }
};
