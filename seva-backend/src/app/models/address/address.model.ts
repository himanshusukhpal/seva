import { Model, DataTypes, Sequelize } from 'sequelize';

export class address extends Model { }

export function initAddress (sequelize: Sequelize) {
  address.init(
    {
      line1: { type: DataTypes.STRING, allowNull: true },
      line2: { type: DataTypes.STRING, allowNull: true },
      locality: { type: DataTypes.STRING, allowNull: true },
      city: { type: DataTypes.STRING, allowNull: true },
      state: { type: DataTypes.STRING, allowNull: true },
      pincode: { type: DataTypes.STRING, allowNull: true },
      country: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.BOOLEAN, allowNull: false },
      createdBy: { type: DataTypes.INTEGER, allowNull: false },
      updatedBy: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      scopes: {
        active: {
          where: {
            status: true
          }
        },
      }
    }
  );

  return address;
}
