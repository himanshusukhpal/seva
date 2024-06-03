"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const db_config_1 = require("../config/db.config");
class BaseService {
    async getProviderById(id) {
        const account = await db_config_1.db.providers.findByPk(id);
        if (account)
            return account;
        else
            throw Error('Account Not Found');
    }
}
exports.BaseService = BaseService;