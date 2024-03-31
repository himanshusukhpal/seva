import { Model, DataTypes, Sequelize } from 'sequelize';

export function initRole (sequelize: Sequelize) {
  class role extends Model { }
  role.init(
    {
      label: { type: DataTypes.STRING, allowNull: false }
    },
    {
      sequelize
    }
  );
  return role;
}
