module.exports = function(sequelize, Sequelize) {


    var Post = sequelize.define('posts', {

        // freezeTableName: true,

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        title: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        author: {
            type: Sequelize.STRING
        },

        information: {
            type: Sequelize.TEXT
        },

        slug: {
            type: Sequelize.STRING,
            unique: true
        },

        path: {
            type: Sequelize.TEXT,
            defaultValue: null
        }

    });

    return Post;

}