"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const express_1 = require("express");
const response_service_1 = require("../../services/response.service");
const account_service_1 = require("../../services/account.service");
const respond = new response_service_1.ResponseService();
const accountService = new account_service_1.AccountService();
class AccountController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get('/', this.getAccount);
    }
    async getAccount(req, res, next) {
        try {
            const account = await accountService.getAccountById(req.headers.accountId);
            respond.success(res, 'Account Fetched', account);
        }
        catch (e) {
            if (e.message === 'Account Not Found')
                respond.unauthorized(res);
            else
                next(e);
        }
    }
}
exports.AccountController = AccountController;
