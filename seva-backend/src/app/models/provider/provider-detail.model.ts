import { Model, DataTypes, Sequelize } from 'sequelize';

export function initProviderDetail (sequelize: Sequelize) {
  class providerDetail extends Model { }
  providerDetail.init(
    {
      accountId: { type: DataTypes.INTEGER, allowNull: false },
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
      tableName: 'provider-details',
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

  return providerDetail;
}
