'use strict';
const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role_Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Role, Permission}) {
      this.belongsTo(Role, {foreignKey: 'roleId', as: 'role'})
      this.belongsTo(Permission, {foreignKey: 'permissionId', as: 'perms'})
    }
  }
  Role_Permissions.init({
  }, {
    sequelize,
    tableName: 'role_permissions',
    modelName: 'Role_Permissions',
    timestamps: false
  });
  return Role_Permissions;
};