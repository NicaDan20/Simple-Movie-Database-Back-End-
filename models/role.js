'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Permission, Role_Permissions}) {
        this.belongsToMany(Permission, {through: Role_Permissions, as: 'perms', foreignKey: 'roleId'})
    }
  }
  Role.init({
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'roles',
    modelName: 'Role',
    timestamps: false
  });
  return Role;
};

// Roles: Admin (Superuser), User, Unnapproved User
