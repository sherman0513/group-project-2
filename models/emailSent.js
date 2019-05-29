module.exports = function(sequelize, DataTypes) {
    var emailSent = sequelize.define("emailSent", {
      subject: DataTypes.STRING,
      recipient : DataTypes.STRING,
      from:DataTypes.STRING,
      body:DataTypes.STRING,
      sentdt: DataTypes.DATE
      
     
    });
 
    emailSent.associate = function(models) {
        
        emailSent.belongsTo(models.hiker, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    
 
 
 
    return emailSent;
  };
  