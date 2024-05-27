"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initConsumer = void 0;
const sequelize_1 = require("sequelize");
function initConsumer(sequelize) {
    class consumer extends sequelize_1.Model {
    }
    consumer.init({
        name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        phone: { type: sequelize_1.DataTypes.STRING, allowNull: false },
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
    return consumer;
}
exports.initConsumer = initConsumer;
