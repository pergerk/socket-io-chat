"use strict";
const tableName = "chat__messages";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(tableName, {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        chatId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        senderId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        message: {
          type: Sequelize.STRING(1024),
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        }
      })
      .then(() =>
        queryInterface.addConstraint(tableName, ["chatId"], {
          type: "foreign key",
          references: {
            table: "chat__list",
            field: "id"
          }
        })
      )
      .then(() =>
        queryInterface.addConstraint("chat__messages", ["senderId"], {
          type: "foreign key",
          references: {
            table: "user__users",
            field: "id"
          }
        })
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("chat__messages");
  }
};
