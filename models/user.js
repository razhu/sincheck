'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    usuario: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    nit: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};