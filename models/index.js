"use strict";

let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
let env = process.env.NODE_ENV || 'development';
let configFile = require(path.join(__dirname, '..', 'config', 'config.js'))[env];
// var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
let depConfig = {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: 'mysql',
    options: { operatorsAliases: false }
};
console.log(configFile);
let sequelize = new Sequelize(configFile.database, configFile.username, configFile.password, configFile);
// var sequelize = new Sequelize(config.database, config.username, config.password, config);
let db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));
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