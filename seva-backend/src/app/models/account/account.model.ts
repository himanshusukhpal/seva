import { Model, DataTypes, Sequelize } from 'sequelize';

export function initAccount (sequelize: Sequelize) {
  class account extends Model { }
  account.init(
    {
      templateId: { type: DataTypes.INTEGER },
      email: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      pan: { type: DataTypes.STRING, allowNull: false },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      // code: { type: DataTypes.STRING, allowNull: false },
      rightsLevel: { type: DataTypes.TINYINT, allowNull: false }, // 1= master control, 2= all self control (CRUD), 3= only view rights
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
