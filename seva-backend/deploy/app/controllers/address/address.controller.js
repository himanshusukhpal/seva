"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const express_1 = require("express");
const response_service_1 = require("../../services/response.service");
const address_service_1 = require("../../services/address.service");
const respond = new response_service_1.ResponseService();
const addressService = new address_service_1.AddressService();
class AddressController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get('/', this.getAccountAddresses);
    }
    async getAccountAddresses(req, res, next) {
        try {
            const addresses = await addressService.getAccountAddresses(req.headers.accountId);
            respond.success(res, 'Addresses Fetched', addresses);
        }
        catch (e) {
            if (e.message === 'Addresses not found')
                respond.unauthorized(res);
            else
                next(e);
        }
    }
}
exports.AddressController = AddressController;
