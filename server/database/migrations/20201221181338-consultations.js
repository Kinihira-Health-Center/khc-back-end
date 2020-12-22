const up = (queryInterface, Sequelize) => queryInterface.createTable('consultations', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  patient_id: {
    type: Sequelize.INTEGER
  },
  type_of_visit: {
    type: Sequelize.STRING
  },
  disease_episode: {
    type: Sequelize.STRING,
  },
  purpose_of_visit: {
    type: Sequelize.STRING
  },
diagnostic: {
    type: Sequelize.STRING
  },
  consultation: {
    type: Sequelize.STRING
  },
 lab_tests: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
 medicines: {
  type: Sequelize.ARRAY(Sequelize.STRING)
    
  },
  consumables: {
    type: Sequelize.ARRAY(Sequelize.STRING)
      
    },
    hospitalization: {
      type: Sequelize.ARRAY(Sequelize.DATE)
        
      },
  ambulance: {
    type: Sequelize.DATE
   
  },
  others: {
    type: Sequelize.STRING
   
  },isProcessed: {
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
const down = (queryInterface) => queryInterface.dropTable('consultations');
export { up, down };