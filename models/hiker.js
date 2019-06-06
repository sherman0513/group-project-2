/* eslint-disable linebreak-style */
module.exports = function(sequelize, DataTypes) {
  var Hiker = sequelize.define("Hiker", {
    fName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },

    lName: {
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
    // c1: DataTypes.BOOLEAN,
    // c2: DataTypes.BOOLEAN,
    // c3: DataTypes.BOOLEAN,
    // c4: DataTypes.BOOLEAN,
    // c5: DataTypes.BOOLEAN,

    // longit: DataTypes.DOUBLE,
    // latit: DataTypes.DOUBLE
  });

  // Hiker.associate = function(models) {
  //   Hiker.hasMany(models.SearchFav, {
  //     onDelete: "cascade"
  //   });
  // };

  // Hiker.associate = function(models) {
  //   Hiker.hasMany(models.EmailSent, {
  //     onDelete: "cascade"
  //   });
  // };

  return Hiker;
};
