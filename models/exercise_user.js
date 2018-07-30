module.exports = function(sequelize, Sequelize) {


    var Exercise_User = sequelize.define('exercise_user', {

        user_id: {
            primaryKey: true,
            type: Sequelize.STRING,
            notEmpty: true                     
        },

        username: {
            type: Sequelize.STRING,
            notEmpty: true,
            unique: true
        }

    }, {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });

    return Exercise_User;

}