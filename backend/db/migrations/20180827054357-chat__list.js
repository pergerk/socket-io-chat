"use strict";
const tableName = "chat__list";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(tableName, {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        creatorId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        theme: {
          type: Sequelize.STRING(128),
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW")
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        }
      })
      .then(() =>
        queryInterface.addConstraint(tableName, ["creatorId"], {
          type: "foreign key",
          references: {
            table: "user__users",
            field: "id"
          }
        })
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("chat__list");
  }
};
