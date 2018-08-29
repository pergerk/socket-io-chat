"use strict";
const tableName = "user__users";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      tableName,
      [
        {
          id: 1,
          login: "kule",
          nick: "kule",
          password:
            "ac78cac28aaf0b194dd64d8c3a73a49846ecc221552021b79246ec39632aba75",
          salt: "c92bbd88a0a48889ebebb7fcb858466d6eb87364",
          createdAt: new Date()
        },
        {
          id: 2,
          login: "User1",
          nick: "User1",
          password:
            "ac78cac28aaf0b194dd64d8c3a73a49846ecc221552021b79246ec39632aba75",
          salt: "c92bbd88a0a48889ebebb7fcb858466d6eb87364",
          createdAt: new Date()
        },
        {
          id: 3,
          login: "User2",
          nick: "User2",
          password:
            "ac78cac28aaf0b194dd64d8c3a73a49846ecc221552021b79246ec39632aba75",
          salt: "c92bbd88a0a48889ebebb7fcb858466d6eb87364",
          createdAt: new Date()
        },
        {
          id: 4,
          login: "User3",
          nick: "User3",
          password:
            "ac78cac28aaf0b194dd64d8c3a73a49846ecc221552021b79246ec39632aba75",
          salt: "c92bbd88a0a48889ebebb7fcb858466d6eb87364",
          createdAt: new Date()
        },
        {
          id: 5,
          login: "User4",
          nick: "User4",
          password:
            "ac78cac28aaf0b194dd64d8c3a73a49846ecc221552021b79246ec39632aba75",
          salt: "c92bbd88a0a48889ebebb7fcb858466d6eb87364",
          createdAt: new Date()
        }
      ],
      {}
    ).catch(()=>Promise.resolve());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null,{});
  }
};
