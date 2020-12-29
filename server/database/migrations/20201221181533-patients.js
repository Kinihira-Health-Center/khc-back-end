const up = (queryInterface, Sequelize) => queryInterface.createTable('patients', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  household_id: {
    type: Sequelize.STRING
  },
  household_name: {
    type: Sequelize.STRING,
  },
  patient_nid: {
    type: Sequelize.STRING
  },
  patient_noid: {
    type: Sequelize.STRING
  },
  firstname: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  },
  area: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
    
  },
  ubudehe: {
    type: Sequelize.INTEGER,
    
  },
  age: {
    type: Sequelize.INTEGER,
    
  },
  sex: {
    type: Sequelize.STRING,
    
  },
  prisoner: {
    type: Sequelize.STRING,
    
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
const down = (queryInterface) => queryInterface.dropTable('patients');
export { up, down };