"use strict";
module.exports = (sequelize, DataTypes) => {
  var ChatRole = sequelize.define(
    "ChatRole",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    { tableName: "chat__roles" }
  );
  ChatRole.associate = () => {};
  return ChatRole;
};
