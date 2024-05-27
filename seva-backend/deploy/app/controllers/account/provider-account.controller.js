"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderAccountController = void 0;
const express_1 = require("express");
const response_service_1 = require("../../services/response.service");
const provider_service_1 = require("../../services/provider.service");
const respond = new response_service_1.ResponseService();
const providerService = new provider_service_1.ProviderService();
class ProviderAccountController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get('/', this.getProvider);
        // this.router.post('/', this.updateMyProviderAccount);
    }
    async getProvider(req, res, next) {
        try {
            const provider = await providerService.getProviderById(req.headers.accountId);
            respond.success(res, 'Provider Fetched', provider);
        }
        catch (e) {
            if (e.message === 'Provider Not Found')
                respond.unauthorized(res);
            else
                next(e);
        }
    }
}
exports.ProviderAccountController = ProviderAccountController;
