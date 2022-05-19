const Sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable("teams", 
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  });
},
  down: async (queryInterface) => {
    await queryInterface.dropTable("teams");
  },
};