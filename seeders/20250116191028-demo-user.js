"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Super",
          lastName: "Admin",
          email: "super@admin.com",
          password: "securepassword", // Use a hashed password in real-world apps
          role: "superadmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "User",
          lastName: "name",
          email: "name@user.com",
          password: "securepassword", // Use a hashed password in real-world apps
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Admin",
          lastName: "Admin",
          email: "admin@admin.com",
          password: "securepassword", // Use a hashed password in real-world apps
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
