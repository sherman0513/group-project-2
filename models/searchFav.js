module.exports = function(sequelize, DataTypes) {
  var searchFav = sequelize.define("searchFav", {
    trailName: DataTypes.STRING,
    type: DataTypes.STRING,
    summary: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    stars: DataTypes.DOUBLE,
    location: DataTypes.STRING,
    url: DataTypes.STRING,
    image: DataTypes.STRING,
    length: DataTypes.DOUBLE,
    longit: DataTypes.DOUBLE,
    latit: DataTypes.DOUBLE,
    conditionStat: DataTypes.STRING,
    conditionDetails: DataTypes.STRING,
    conditionDate: DataTypes.STRING,
    searchedDate: DataTypes.DATE
  });

  searchFav.associate = function(models) {
    searchFav.belongsTo(models.hiker, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return searchFav;
};
