'use strict';
module.exports = (sequelize, DataTypes) => {
  var skiresort = sequelize.define('skiresort', {
    name: DataTypes.STRING,
    liftCount: DataTypes.INTEGER,
    vertical: DataTypes.INTEGER,
    cost: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return skiresort;
};