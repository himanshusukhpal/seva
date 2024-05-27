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
}
exports.AccountService = AccountService;
