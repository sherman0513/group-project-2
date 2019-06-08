module.exports = function (sequelize, Sequelize) {

    var User = sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        username: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        address: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        city: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        state: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        zip: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                len: [5]
            }
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        last_login: {
            type: Sequelize.DATE
        },

        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }


    });

    User.associate = function(models) {
        User.hasMany(models.SearchFav, {
          onDelete: "cascade"
        });
      };
    

    return User;

}