"use strict";
const tableName = "chat__users";
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
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        roleId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM,
          values: ["blocked", "active"],
          allowNull: false
        },
        bannedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        unbannedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        joinedAt: {
          type: Sequelize.DATE,
          allowNull: true
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
        queryInterface.addConstraint(tableName, ["userId"], {
          type: "foreign key",
          name: "FK_chat_users_to_users",
          references: {
            table: "user__users",
            field: "id"
          }
        })
      )
      .then(() =>
        queryInterface.addConstraint(tableName, ["chatId"], {
          type: "foreign key",
          name: "FK_chat_users_to_chat_list",
          references: {
            table: "chat__list",
            field: "id"
          }
        })
      )
      .then(() =>
        queryInterface.addConstraint(tableName, ["roleId"], {
          type: "foreign key",
          name: "FK_chat_users_to_chat_roles",
          references: {
            table: "chat__roles",
            field: "id"
          }
        })
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  }
};
