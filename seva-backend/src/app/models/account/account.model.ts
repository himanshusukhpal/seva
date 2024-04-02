import { Model, DataTypes, Sequelize } from 'sequelize';

export function initAccount (sequelize: Sequelize) {
  class account extends Model { }
  account.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.BOOLEAN, allowNull: false },
      createdBy: { type: DataTypes.INTEGER, allowNull: false },
      updatedBy: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      defaultScope: {
        // exclude password hash by default
        attributes: {
          exclude: ['passwordHash']
        }
      },
      scopes: {
        active: {
          where: {
            status: true
          }
        },
        // include hash with this scope
        withHash: {
          attributes: {
            include: ['passwordHash']
          }
        }
      }
    }
  );

  return account;
}
