/* eslint-disable linebreak-style */
module.exports = function(sequelize, DataTypes) {
  var Hiker = sequelize.define("Hiker", {
    fname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },

    lname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },

    // gender: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    }
  });

  Hiker.associate = function(models) {
    Hiker.hasMany(models.SearchFav, {
      onDelete: "cascade"
    });
  };
  return Hiker;
};
