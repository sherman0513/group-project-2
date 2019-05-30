/* eslint-disable linebreak-style */
module.exports = function(sequelize, DataTypes) {
  var hiker = sequelize.define("hiker", {
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },

    lname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },

    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5] }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5] }
    },
    c1: DataTypes.BOOLEAN,
    c2: DataTypes.BOOLEAN,
    c3: DataTypes.BOOLEAN,
    c4: DataTypes.BOOLEAN,
    c5: DataTypes.BOOLEAN,
    longit: DataTypes.DOUBLE,
    latit: DataTypes.DOUBLE
  });

  hiker.associate = function(models) {
    hiker.hasMany(models.searchFav, {
      onDelete: "cascade"
    });
  };

  hiker.associate = function(models) {
    hiker.hasMany(models.emailSent, {
      onDelete: "cascade"
    });
  };

  return hiker;
};
