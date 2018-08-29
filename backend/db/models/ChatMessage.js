"use strict";
module.exports = (sequelize, DataTypes) => {
  var ChatMessage = sequelize.define(
    "ChatMessage",
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
      message: {
        type: DataTypes.STRING(1024),
        allowNull: false
      },
      senderId: {
        type: DataTypes.INTEGER,
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
    {
      tableName: "chat__messages"
    }
  );
  ChatMessage.associate = () =>{
      
  }
  return ChatMessage;
};
