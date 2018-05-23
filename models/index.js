"use strict";

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
// var env = process.env.NODE_ENV || 'development';
// var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
console.log(process.env.RDS_DB_NAME);
var depConfig = {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: 'mysql',
    options: { operatorsAliases: false }
};
console.log(depConfig.database);
var sequelize = new Sequelize(depConfig.database, depConfig.username, depConfig.password, depConfig);
// var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;