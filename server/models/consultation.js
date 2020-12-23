const consultationDefinition = (sequelize, DataTypes) => {
    const Consultation = sequelize.define('consultation', {
        patient_id: { type: DataTypes.INTEGER },
        type_of_visit: { type: DataTypes.STRING },
        disease_episode: {
        type: DataTypes.STRING
      },
      purpose_of_visit: {
        type: DataTypes.STRING
      },
      diagnostic: {
        type: DataTypes.STRING
      },
      lab_tests: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      medecines: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      consumables: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      hospitalization: {
        type: DataTypes.ARRAY(DataTypes.DATE)
      },
      ambulance: {
        type: DataTypes.DATES
      },
      others: {
        type: DataTypes.STRING
      },
      isProcessed: {
        type: DataTypes.STRING
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      }
    }, {});
  
    Consultation.associate = (models) => {
      Consultation.hasOne(models.patient, {
        foreignKey: 'patient_id',
        as: 'patient',
        onDelete: 'CASCADE',
      });
    };
    Consultation.hasOne(models.Consultation, {
      foreignKey: {
        allowNull: false
      }
    });
    return Consultation;
  };
  
  export default consultationDefinition;
  