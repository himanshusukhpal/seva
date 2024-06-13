"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAccount = exports.account = void 0;
const sequelize_1 = require("sequelize");
class account extends sequelize_1.Model {
}
exports.account = account;
function initAccount(sequelize) {
    account.init({
        name: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        dob: { type: sequelize_1.DataTypes.DATE, allowNull: true },
        email: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        phone: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        isProvider: { type: sequelize_1.DataTypes.BOOLEAN },
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
    return account;
}
exports.initAccount = initAccount;
