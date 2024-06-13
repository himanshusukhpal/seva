"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProviderDetail = exports.providerDetail = void 0;
const sequelize_1 = require("sequelize");
class providerDetail extends sequelize_1.Model {
}
exports.providerDetail = providerDetail;
function initProviderDetail(sequelize) {
    providerDetail.init({
        accountId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        status: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
        aadhar: { type: sequelize_1.DataTypes.STRING },
        pan: { type: sequelize_1.DataTypes.STRING },
        emergencyContactName: { type: sequelize_1.DataTypes.STRING },
        emergencyContactPhone: { type: sequelize_1.DataTypes.STRING },
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
