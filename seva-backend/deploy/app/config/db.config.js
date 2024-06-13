"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.sequelizeConn = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const index_models_1 = require("../models/index.models");
dotenv_1.default.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
// connect to db
exports.sequelizeConn = new sequelize_1.Sequelize(DB_NAME ? DB_NAME : '', DB_USER ? DB_USER : '', DB_PASSWORD ? DB_PASSWORD : '', {
    host: DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
const db = (0, index_models_1.indexModels)(exports.sequelizeConn);
exports.db = db;
exports.sequelizeConn.sync({ alter: true })
    .then(() => {
    console.log('Synced db.');
})
    .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
});
