const up = (queryInterface, Sequelize) => queryInterface.createTable('consumables', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.STRING
  },
  created_at: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  },
  updated_at: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  }
});
const down = (queryInterface) => queryInterface.dropTable('consumables');
export { up, down };
