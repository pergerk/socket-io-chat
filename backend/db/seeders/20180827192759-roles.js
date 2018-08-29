"use strict";
const tableName = "chat__roles";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      tableName,
      [
        {
          id: 1,
          name: "Administrator",
          createdAt: new Date()
        },
        {
          id: 2,
          name: "User",
          createdAt: new Date()
        }
      ],
      {}
    ).catch(()=>Promise.resolve());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, { where: { id: [1, 2] } });
  }
};
