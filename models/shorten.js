module.exports = function(sequelize, Sequelize) {
    var Short = sequelize.define('short', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        url: {
            type: Sequelize.TEXT,
            notEmpty: true
        }

    }, {
        freezeTableName: true,
    });
    return Short;
}