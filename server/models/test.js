const testDefinition = (sequelize, DataTypes) => {
    const Test = sequelize.define('test', {
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
  
    return Test;
  };
  
  export default testDefinition;
  