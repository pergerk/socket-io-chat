"use strict";
module.exports = (sequelize, DataTypes) => {
  var ChatList = sequelize.define(
    "ChatList",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      theme: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: "chat__list"
    }
  );
  ChatList.associate = () => {};
  return ChatList;
};
