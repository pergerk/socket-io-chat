"use strict";
var tableName = "user__tokens";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(tableName, {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        token: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false
        },
        expiredAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      })
      .then(() =>
        queryInterface.addConstraint(tableName, ["userId"], {
          type: "foreign key",
          name: "FK_token_to_user",
          references: {
            table: "user__users",
            field: "id"
          }
        })
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  }
};
