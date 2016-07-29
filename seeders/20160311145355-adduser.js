'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        var fecha = new Date();
        return queryInterface.bulkInsert('users', [

            {
                nit: 12345678,
                usuario: "rhuayler",
                contrasena: "1234",
                createdAt: fecha,
                updatedAt: fecha
            },

            {
                nit: 123456,
                usuario: "gvargas",
                contrasena: "1234",
                createdAt: fecha,
                updatedAt: fecha
            },
            {
                nit: 154623,
                usuario: "fhuayta",
                contrasena: "1123",
                createdAt: fecha,
                updatedAt: fecha
            }
            ,
            {
                nit: 569357,
                usuario: "rcoarite",
                contrasena: "123",
                createdAt: fecha,
                updatedAt: fecha
            },
            {
                nit: 335454,
                usuario: "ejimenez",
                contrasena: "798989",
                createdAt: fecha,
                updatedAt: fecha
            }

        ], {});
    },

    down: function(queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
    }
};