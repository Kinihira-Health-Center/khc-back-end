const medecineDefinition = (sequelize, DataTypes) => {
    const Medecine = sequelize.define('token', {
      name: { type: DataTypes.STRING },
      prise: { type: DataTypes.STRING },
      created_at: { type: DataTypes.DATE },
      updated_at: { type: DataTypes.DATE }
    }, {});
  
    // Token.associate = (models) => {
    //   Token.belongsTo(models.user, {
    //     foreignKey: 'userId',
    //     as: 'user',
    //     onDelete: 'CASCADE',
    //   });
   // };
  
    return Medecine;
  };
  
  export default medecineDefinition;
  