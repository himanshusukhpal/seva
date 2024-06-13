"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const db_config_1 = require("../config/db.config");
class AccountService {
    async getAccountById(id) {
        const account = await db_config_1.db.accounts.findByPk(id);
        if (account)
            return account;
        else
            throw Error('Account Not Found');
    }
    async getAccountByIdWithProviderDetail(id) {
        const account = await db_config_1.db.accounts.findByPk(id, {
            include: db_config_1.db.providerDetails
        });
        if (account)
            return account;
        else
            throw Error('Account Not Found');
    }
    async getAccountByPhone(phone) {
        return await db_config_1.db.accounts.findOne({
            where: {
                phone
            }
        });
    }
    async signUpAccount(requestBody) {
        return db_config_1.sequelizeConn.transaction(async (t) => {
            const newAccount = Object.assign(requestBody, {
                status: true,
                createdBy: 0,
                updatedBy: 0
            });
            const savedAccount = await (new db_config_1.db.accounts(newAccount)).save({ transaction: t });
            return savedAccount;
        });
    }
    async updateAccount(accountId, accountUpdatePayload) {
        return db_config_1.sequelizeConn.transaction(async (t) => {
            const account = await this.getAccountById(accountId);
            await account.update(accountUpdatePayload);
            const updatedAccount = await account.save({ transaction: t });
            return updatedAccount;
        });
    }
}
exports.AccountService = AccountService;
