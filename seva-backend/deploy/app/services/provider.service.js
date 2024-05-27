"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const db_config_1 = require("../config/db.config");
class ProviderService {
    async getAccountProviderDetail(accountId, active) {
        return await (active ?
            db_config_1.db.providerDetails.scope('active') :
            db_config_1.db.providerDetails).findAll({
            where: {
                accountId
            }
        });
    }
    async getProviderDetailById(id) {
        const providerDetail = await db_config_1.db.providers.findByPk(id);
        if (providerDetail)
            return providerDetail;
        else
            throw Error('Provider Detail Not Found');
    }
}
exports.ProviderService = ProviderService;
