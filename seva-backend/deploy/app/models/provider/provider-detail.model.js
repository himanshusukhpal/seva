"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProviderDetail = void 0;
const sequelize_1 = require("sequelize");
function initProviderDetail(sequelize) {
    class providerDetail extends sequelize_1.Model {
    }
    providerDetail.init({
        accountId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        status: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
        createdBy: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        updatedBy: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
    }, {
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
    });
    return providerDetail;
}
exports.initProviderDetail = initProviderDetail;
