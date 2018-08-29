"use strict";
module.exports = (sequelize, DataTypes) => {
  var ChatUser = sequelize.define(
    "ChatUser",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2
      },
      status: {
        type: DataTypes.ENUM,
        values: ["blocked", "active"],
        allowNull: false,
        defaultValue: "active"
      },
      bannedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      unbannedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      joinedAt: {
        type: DataTypes.DATE,
        allowNull: true
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
    {
      tableName: "chat__users",
      scopes: {
        active: {
          where: { status: "active" }
        }
      }
    }
  );
  return ChatUser;
};
