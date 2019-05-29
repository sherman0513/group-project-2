module.exports = function(sequelize, DataTypes) {
    var locationCord = sequelize.define("locationCord", {
      location: DataTypes.STRING,
      longit : DataTypes.DOUBLE,
      latit:DataTypes.DOUBLE,
      zip:DataTypes.STRING,
          
    });
    return locationCord;
  };
  