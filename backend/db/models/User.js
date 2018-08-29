"use strict";
const crypto = require("crypto");
const _ = require("lodash");

const signatureKey =
  "dgsdSAKLDJKsas!2ww23QMedwqwer2424t3t5wr45357567y4565323banscmnz xc&^#*$";

function hashPassword({ salt, password }) {
  var s = salt || crypto.randomBytes(20).toString("hex");
  var hash = crypto.createHash("sha256");
  hash.update(signatureKey + password + s);
  return { password: hash.digest("hex"), salt: s };
}

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      login: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      nick: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      salt: {
        type: DataTypes.STRING(255),
        allowNull: true
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
      tableName: "user__users"
    }
  );
  User.associate = db => {
    db.User.hasMany(db.ChatMessage, {
      as: "message",
      foreignKey: "senderId",
      sourceKey: "id"
    });
    db.User.hasMany(db.UserToken, {
      as: "token",
      foreignKey: "userId",
      sourceKey: "id"
    });
  };

  User.login = function({ login, password }) {
    return this.find({ where: { login }, rejectOnEmpty: true })
      .catch(() => {
        throw new Error("User not found");
      })
      .then(user => user.auth({ password }));
  };

  User.register = function({ login, password }) {
    return this.create({
      login,
      nick: login,
      ...hashPassword({ password })
    });
  };

  User.prototype.auth = function({ password }) {
    var { password } = hashPassword({ salt: this.salt, password });
    if (password == this.password) {
      return Promise.resolve(this);
    } else {
      throw new Error("Password did't match");
    }
  };

  User.prototype.updatePassword = function({ password }) {
    var { password, salt } = hashPassword({ password });
    this.password = password;
    this.salt = salt;
    return this.save();
  };

  User.getChats = function({ id }) {
    return sequelize.query(
      "\
    SELECT cl.* FROM chat__list cl\
    INNER JOIN chat__users cu ON cu.chatId = cl.id\
                             AND cu.status = :status\
    INNER JOIN user__users uu ON cu.userId = uu.id\
    WHERE uu.id = :id",
      {
        replacements: { status: "active", id: id },
        model: this.sequelize.models.ChatList,
        type: sequelize.QueryTypes.SELECT
      }
    );
  };
  User.prototype.getChats = function() {
    return User.getChats({ id: this.id });
  };
  User.getMessages = function({ id, chatId }) {
    return sequelize.query(
      "\
    SELECT cm.* FROM chat__messages cm\
    INNER JOIN chat__users cu ON cu.chatId = cm.chatId\
                             AND cu.status = :status\
    INNER JOIN user__users uu ON cu.userId = uu.id\
    WHERE uu.id = :id and cu.chatId = :chatId",
      {
        replacements: { status: "active", id: id, chatId: chatId },
        model: this.sequelize.models.ChatMessages,
        type: sequelize.QueryTypes.SELECT
      }
    );
  };
  User.prototype.getMessages = function({ chatId }) {
    return User.getMessages({ id: this.id, chatId });
  };
  return User;
};
