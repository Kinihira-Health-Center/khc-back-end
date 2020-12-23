const labTestnDefinition = (sequelize, DataTypes) => {
    const TabTest = sequelize.define('labTest', {
      value: { type: DataTypes.STRING },
      patient_id: { type: DataTypes.INTEGER },
      consultation_id: { type: DataTypes.INTEGER },
      isProcessed: { type: DataTypes.STRING },
      response: { type: DataTypes.STRING },
      created_at: { type: DataTypes.DATE },
      updated_at: { type: DataTypes.DATE }
    }, {});
  
    TabTest .associate = (models) => {
      TabTest .hasMany(models.patient, {
        foreignKey: 'patient_id',
        as: 'patient',
        onDelete: 'CASCADE',
      });
    };
    
    TabTest .associate = (models) => {
      TabTest .hasMany(models.consultation, {
        foreignKey: 'consultation_id',
        as: 'consultation',
        onDelete: 'CASCADE',
      });
    };
  
  
    return Token;
  };
  
  export default tokenDefinition;
  