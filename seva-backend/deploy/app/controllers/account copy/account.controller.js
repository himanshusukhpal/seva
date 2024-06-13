"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const validate_request_middleware_1 = require("../../middleware/validate-request.middleware");
const response_service_1 = require("../../services/response.service");
const account_service_1 = require("../../services/account.service");
const provider_service_1 = require("../../services/provider.service");
const respond = new response_service_1.ResponseService();
const accountService = new account_service_1.AccountService();
const providerService = new provider_service_1.ProviderService();
class AccountController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get('/', this.getAccount);
        this.router.post('/', this.updateAccountSchema, this.updateAccount);
    }
    async getAccount(req, res, next) {
        try {
            const account = await accountService.getAccountByIdWithProviderDetail(req.headers.accountId);
            respond.success(res, 'Account Fetched', account);
        }
        catch (e) {
            if (e.message === 'Account Not Found')
                respond.unauthorized(res);
            else
                next(e);
        }
    }
    updateAccountSchema(req, res, next) {
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            dob: joi_1.default.date().allow(null),
            email: joi_1.default.string().allow(null, ''),
            isProvider: joi_1.default.boolean().allow(null),
            providerDetail: joi_1.default.object({
                aadhar: joi_1.default.string().allow(null),
                pan: joi_1.default.string().allow(null),
                emergencyContactName: joi_1.default.string().allow(null),
                emergencyContactPhone: joi_1.default.string().allow(null)
            }).allow(null)
        });
        (0, validate_request_middleware_1.validateRequest)(req, res, next, schema);
    }
    async updateAccount(req, res, next) {
        try {
            const providerDetailsToUpdate = JSON.parse(JSON.stringify(req.body.providerDetail || null));
            delete req.body.providerDetail;
            const updatedAccount = (await accountService.updateAccount(req.headers.accountId, req.body)).toJSON();
            if (req.body.isProvider) {
                if (providerDetailsToUpdate) {
                    const providerDetail = await providerService.getAccountProviderDetail(req.headers.accountId);
                    const providerDetailId = providerDetail?.getDataValue('id');
                    let updatedProviderDetail;
                    if (providerDetailId) {
                        updatedProviderDetail = await providerService.updateProviderDetailById(providerDetailId, providerDetailsToUpdate);
                    }
                    else {
                        updatedProviderDetail = await providerService.createProviderDetail(req.headers.accountId, providerDetailsToUpdate);
                    }
                    updatedAccount['providerDetail'] = updatedProviderDetail;
                }
                else
                    throw Error('Provider details are required for registration');
            }
            respond.success(res, 'Account Updated', updatedAccount);
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
