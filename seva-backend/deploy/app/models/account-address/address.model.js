"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAddress = exports.address = void 0;
const sequelize_1 = require("sequelize");
class address extends sequelize_1.Model {
}
exports.address = address;
function initAddress(sequelize) {
    address.init({
        line1: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        line2: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        locality: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        city: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        state: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        pincode: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        country: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        status: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
        createdBy: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        updatedBy: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
    }, {
        sequelize,
        scopes: {
            active: {
                where: {
                    status: true
                }
            },
        }
    });
    return address;
}
exports.initAddress = initAddress;
