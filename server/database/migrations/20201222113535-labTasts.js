const up = (queryInterface, Sequelize) => queryInterface.createTable('labTests', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  patient_id: {
    type: Sequelize.INTEGER
  },
  consultation_id: {
    type: Sequelize.INTEGER
  },isProcessed: {
    type: Sequelize.STRING
  },response: {
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
const down = (queryInterface) => queryInterface.dropTable('labTests');
export { up, down };