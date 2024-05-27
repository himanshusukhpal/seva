"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const db_config_1 = require("../config/db.config");
class ProviderService {
    async getProviderById(id) {
        const provider = await db_config_1.db.providers.findByPk(id);
        if (provider)
            return provider;
        else
            throw Error('Provider Not Found');
    }
}
exports.ProviderService = ProviderService;
