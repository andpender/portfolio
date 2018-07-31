let config = {
    "development": {

        "username": "root",

        "database": "blog",

        "host": "localhost",

        "dialect": "mysql",

        "define": { "rejectOnEmpty": true },

        "options": {
            "operatorsAliases": false
        }
    },

    "test": {

        "username": "root",

        "database": "blog",

        "host": "localhost",

        "dialect": "mysql",

        "define": { "rejectOnEmpty": true },

        "options": {
            "operatorsAliases": false
        }
    },

    "production": {

        username: process.env.RDS_USERNAME,

        password: process.env.RDS_PASSWORD,

        database: process.env.RDS_DB_NAME,

        host: process.env.RDS_HOSTNAME,

        port: process.env.RDS_PORT,

        "dialect": "mysql",

        "define": { "rejectOnEmpty": true },

        "options": {
            "operatorsAliases": false
        }
    }
};

module.exports = config;