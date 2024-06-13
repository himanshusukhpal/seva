"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDb = void 0;
const index_models_1 = require("../models/index.models");
class syncDb {
    constructor(sequelizeConn) {
        this.sequelizeConn = sequelizeConn;
    }
    sync() {
        (0, index_models_1.indexModels)(this.sequelizeConn);
        this.sequelizeConn.sync({ alter: true })
            .then(() => {
            console.log('Synced db.');
        })
            .catch((err) => {
            console.log('Failed to sync db: ' + err.message);
        });
    }
}
exports.syncDb = syncDb;
