module.exports = function(sequelize, Sequelize) {


    var Exercise = sequelize.define('exercise', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        user_id: {
            type: Sequelize.STRING,
            notEmpty: true                     
        },

        description: {
            type: Sequelize.TEXT,
            notEmpty: true
        },

        duration: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },

        date: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null
        }

    }, {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });

    return Exercise;

}