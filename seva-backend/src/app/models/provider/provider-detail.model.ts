import { Model, DataTypes, Sequelize } from 'sequelize';

export class providerDetail extends Model { }

export function initProviderDetail (sequelize: Sequelize) {
  providerDetail.init(
    {
      accountId: { type: DataTypes.INTEGER, allowNull: false },
      aadhar: { type: DataTypes.STRING },
      pan: { type: DataTypes.STRING },
      emergencyContactName: { type: DataTypes.STRING },
      emergencyContactPhone: { type: DataTypes.STRING },
      createdBy: { type: DataTypes.INTEGER, allowNull: false },
      updatedBy: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      tableName: 'provider-details',
    }
  );

  return providerDetail;
}
