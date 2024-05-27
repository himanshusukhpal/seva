"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderDetailController = void 0;
const express_1 = require("express");
const response_service_1 = require("../../services/response.service");
const provider_service_1 = require("../../services/provider.service");
const respond = new response_service_1.ResponseService();
const providerService = new provider_service_1.ProviderService();
class ProviderDetailController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get('/', this.getProviderDetail);
        // this.router.post('/', this.updateMyProviderAccount);
    }
    async getProviderDetail(req, res, next) {
        try {
            const providerDetail = await providerService.getAccountProviderDetail(req.headers.accountId, true);
            respond.success(res, 'Provider Detail Fetched', providerDetail);
        }
        catch (e) {
            if (e.message === 'Provider Detail Not Found')
                respond.unauthorized(res);
            else
                next(e);
        }
    }
}
exports.ProviderDetailController = ProviderDetailController;
