'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
        var fecha = new Date();
        var usuario = 'admin';
        var contrasena = 'admin'
      return queryInterface.bulkInsert('usuarios', [{
        usuario: usuario,
        contrasena: contrasena,
        nit: 123,
        createdAt: fecha,
        updatedAt: fecha
      },
      {
        usuario: usuario,
        contrasena: contrasena,
        nit: 123,
        createdAt: fecha,
        updatedAt: fecha
      }
      
      ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};