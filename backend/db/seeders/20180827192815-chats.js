"use strict";
const tableName = "chat__list";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      tableName,
      [
        {
          id: 1,
          creatorId: 1,
          theme: "Test Chat 1",
          createdAt: new Date()
        },
        {
          id: 2,
          creatorId: 3,
          theme: "Test Chat 2",
          createdAt: new Date()
        },
        {
          id: 3,
          creatorId: 2,
          theme: "Test Chat 3",
          createdAt: new Date()
        },
        {
          id: 4,
          creatorId: 2,
          theme: "Test Chat 4",
          createdAt: new Date()
        }
      ],
      {}
    ).catch(()=>Promise.resolve());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, {
      where: { id: [1, 2, 3, 4] }
    });
  }
};
