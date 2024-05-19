"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const express_1 = require("express");
const response_service_1 = require("../../services/response.service");
const base_service_1 = require("../../services/base.service");
const respond = new response_service_1.ResponseService();
const baseService = new base_service_1.BaseService();
class AccountController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get('/:type', this.getAccount);
    }
    async getAccount(req, res, next) {
        try {
            let account;
            if (req.params.type === 'provider')
                account = await baseService.getProviderById(req.headers.accountId);
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
