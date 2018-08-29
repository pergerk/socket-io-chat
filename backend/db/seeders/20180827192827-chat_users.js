"use strict";
const tableName = "chat__users";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      tableName,
      [
        {
          id: 1,
          chatId: 1,
          userId: 1,
          roleId: 1,
          status: "active",
          createdAt: new Date()
        },
        {
          id: 2,
          chatId: 1,
          userId: 2,
          roleId: 2,
          status: "active",
          createdAt: new Date()
        },
        {
          id: 3,
          chatId: 1,
          userId: 3,
          roleId: 2,
          status: "active",
          createdAt: new Date()
        },
        {
          id: 4,
          chatId: 1,
          userId: 4,
          roleId: 2,
          status: "active",
          createdAt: new Date()
        },
        {
          id: 5,
          chatId: 2,
          userId: 3,
          roleId: 2,
          status: "active",
          createdAt: new Date()
        },
        {
          id: 6,
          chatId: 2,
          userId: 5,
          roleId: 2,
          status: "active",
          createdAt: new Date()
        },
        {
          id: 7,
          chatId: 3,
          userId: 5,
          roleId: 1,
          status: "active",
          createdAt: new Date()
        },
        {
          id: 8,
          chatId: 3,
          userId: 4,
          roleId: 2,
          status: "active",
          createdAt: new Date()
        }
      ],
      {}
    ).catch(()=>Promise.resolve());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, {});
  }
};
