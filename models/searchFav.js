module.exports = function(sequelize, DataTypes) {
  var SearchFav = sequelize.define("SearchFav", {
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

  SearchFav.associate = function(models) {
    SearchFav.belongsTo(models.Hiker, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return SearchFav;
};
