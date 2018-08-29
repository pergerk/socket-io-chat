"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var confDb = require("./config.db")[env];
var confRedis = require("./config.redis")[env];
var db = {};

const cacher = require("sequelize-redis-cache");
const redis = require("redis");

const rc = redis.createClient(confRedis.port, confRedis.host);

var sequelize = new Sequelize(confDb);

fs.readdirSync(path.join(__dirname , "models"))
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, 'models', file));
    // model.cached = cacher(sequelize, rc)
    //   .model(model.name)
    //   .ttl(5);
    console.log('import ', model.name);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
