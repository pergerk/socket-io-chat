const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  var UserToken = sequelize.define(
    "UserToken",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: function() {
          var buf = Buffer.alloc(127);
          crypto.randomFillSync(buf);
          return buf.toString("hex");
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false
      },
      expiredAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: function() {
          var date = new Date();
          date.setDate(date.getDate() + 1);
          return date;
        }
      }
    },
    {
      updatedAt: false,
      tableName: "user__tokens"
    }
  );
  UserToken.associate = db => {
    db.UserToken.belongsTo(db.User, {
      as: "user",
      foreignKey: "userId",
      targetKey: "id"
    });
  };
  UserToken.prototype.Expire = function() {
    return this.update({ expiredAt: new Date() });
  };
  return UserToken;
};
