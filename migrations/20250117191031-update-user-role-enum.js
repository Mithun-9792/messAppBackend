"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the 'role' column
    await queryInterface.removeColumn("Users", "role");

    // Add the 'role' column as ENUM type
    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.ENUM("superadmin", "admin", "user"),
      allowNull: false, // Adjust as needed
      defaultValue: "user", // Optional default value
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the 'role' column
    await queryInterface.removeColumn("Users", "role");

    // Add back the 'role' column as a STRING
    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.STRING,
    });
  },
};
