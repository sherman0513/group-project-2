module.exports = function(sequelize, DataTypes) {
  var LocationCord = sequelize.define("LocationCord", {
    location: DataTypes.STRING,
    longit: DataTypes.DOUBLE,
    latit: DataTypes.DOUBLE,
    zip: DataTypes.STRING
  });
  return LocationCord;
};
