"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "otp", {
      type: Sequelize.STRING, // Use a suitable data type
      allowNull: true, // Default is NULL
      defaultValue: null, // Explicitly setting default to NULL
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "otp");
  },
};
