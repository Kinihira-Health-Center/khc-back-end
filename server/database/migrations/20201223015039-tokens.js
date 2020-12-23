const up = (queryInterface, Sequelize) => queryInterface.createTable('tokens', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  value: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER
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

const down = (queryInterface) => queryInterface.dropTable('tokens');

export {
  up,
  down
};
