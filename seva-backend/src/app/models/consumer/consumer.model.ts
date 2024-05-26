import { Model, DataTypes, Sequelize } from 'sequelize';

export function initConsumer (sequelize: Sequelize) {
  class consumer extends Model { }
  consumer.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
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

  return consumer;
}
