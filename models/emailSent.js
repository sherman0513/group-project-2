module.exports = function(sequelize, DataTypes) {
  var EmailSent = sequelize.define("emailSent", {
    subject: DataTypes.STRING,
    recipient: DataTypes.STRING,
    from: DataTypes.STRING,
    body: DataTypes.STRING,
    sentdt: DataTypes.DATE
  });

  EmailSent.associate = function(models) {
    EmailSent.belongsTo(models.Hiker, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return EmailSent;
};
