const patientDefinition = (sequelize, DataTypes) => {
    const Patient = sequelize.define('patient', {
        household_id: { type: DataTypes.STRING },
        household_name: { type: DataTypes.STRING },
        patient_nid: {
        type: DataTypes.STRING
      },
      patient_noid: {
        type: DataTypes.STRING
      },
      firstname: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      area: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      ubudehe: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.STRING
      },
      sex: {
        type: DataTypes.STRING
      },
      prisoner: {
        type: DataTypes.STRING
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      }
    }, {});
  
    // // User.associate = (models) => {
    // //   User.hasOne(models.token, {
    // //     foreignKey: 'userId',
    // //     as: 'token',
    // //     onDelete: 'CASCADE',
    // //   });
    // };
    return Patient;
  };
  
  export default patientDefinition;
  