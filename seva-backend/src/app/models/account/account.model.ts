import { Model, DataTypes, Sequelize } from 'sequelize';

export class account extends Model { }

export function initAccount (sequelize: Sequelize) {
  account.init(
    {
      name: { type: DataTypes.STRING, allowNull: true },
      dob: { type: DataTypes.DATE, allowNull: true },
      email: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: false },
      isProvider: { type: DataTypes.BOOLEAN },
      status: { type: DataTypes.BOOLEAN, allowNull: false },
      createdBy: { type: DataTypes.INTEGER, allowNull: false },
      updatedBy: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      // defaultScope: {
        // exclude password hash by default
        // attributes: {
        //   exclude: ['passwordHash']
        // }
      // },
      scopes: {
        active: {
          where: {
            status: true
          }
        },
        // include hash with this scope
        // withHash: {
        //   attributes: {
        //     include: ['passwordHash']
        //   }
        // }
      }
    }
  );

  return account;
}
