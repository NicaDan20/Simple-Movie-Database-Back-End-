'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Role, Role_Permissions}) {
      this.belongsToMany(Role, {through: Role_Permissions, as: 'associated_role', foreignKey: 'permissionId'})
    }
  }
  Permission.init({
    permission: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'permissions',
    modelName: 'Permission',
    timestamps: false
  });
  return Permission;
};