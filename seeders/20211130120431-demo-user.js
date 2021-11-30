'use strict';

const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 0; i < 150; i++) {
      const refDate = new Date(faker.date.past());
      refDate.setFullYear(refDate.getFullYear() - 18);
      var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var passwordLength = Math.floor(Math.random() * 11) + 10
      var pass = "";
      for (var j = 0; j <= passwordLength; j++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        pass += chars.substring(randomNumber, randomNumber +1);
       }
      const firstN = faker.name.firstName();
      const lastN = faker.name.lastName();
      users.push({
        firstName: firstN,
        lastName: lastN,
        dateOfBirth: faker.date.past(70, new Date(refDate)),
        email: firstN + '.' + lastN + '@domain.com',
        password: pass,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Users', users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
