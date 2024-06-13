"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const db_config_1 = require("../config/db.config");
class ProviderService {
    async getAccountProviderDetail(accountId, active) {
        return await (active ?
            db_config_1.db.providerDetails.scope('active') :
            db_config_1.db.providerDetails).findOne({
            where: {
                accountId
            }
        });
    }
    async getProviderDetailById(id) {
        const providerDetail = await db_config_1.db.providerDetails.findByPk(id);
        if (providerDetail)
            return providerDetail;
        else
            throw Error('Provider Detail Not Found');
    }
    async createProviderDetail(accountId, providerDetailPayload) {
        return db_config_1.sequelizeConn.transaction(async (t) => {
            const newproviderDetail = Object.assign(providerDetailPayload, {
                accountId,
                status: true,
                createdBy: accountId,
                updatedBy: accountId
            });
            const savedproviderDetail = await (new db_config_1.db.providerDetails(newproviderDetail)).save({ transaction: t });
            return savedproviderDetail;
        });
    }
    async updateProviderDetailById(id, providerDetailUpdatePayload) {
        return db_config_1.sequelizeConn.transaction(async (t) => {
            const providerDetail = await this.getProviderDetailById(id);
            await providerDetail.update(providerDetailUpdatePayload);
            const updatedProviderDetail = await providerDetail.save({ transaction: t });
            return updatedProviderDetail;
        });
    }
}
exports.ProviderService = ProviderService;
