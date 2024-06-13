"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
// import bcrypt from 'bcryptjs';
const response_service_1 = require("../../services/response.service");
const validate_request_middleware_1 = require("../../middleware/validate-request.middleware");
const account_service_1 = require("../../services/account.service");
const token_service_1 = require("../../services/token.service");
const tokenService = new token_service_1.TokenService();
const respond = new response_service_1.ResponseService();
const accountService = new account_service_1.AccountService();
class AuthController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.post('/sign', this.signSchema, this.sign);
        // this.router.post('/sign/up', signUpSchema, signUp);
    }
    signSchema(req, res, next) {
        const schema = joi_1.default.object({
            phone: joi_1.default.string().length(10).required()
        });
        (0, validate_request_middleware_1.validateRequest)(req, res, next, schema);
    }
    async sign(req, res, next) {
        try {
            let account = await accountService.getAccountByPhone(req.body.phone);
            if (!account)
                account = await accountService.signUpAccount(req.body);
            const accountId = account.get('id');
            const accessToken = tokenService.generateToken({ accountId });
            const date = new Date();
            date.setDate(date.getDate() + 1);
            respond.success(res, `Sign In success`, {
                accessToken
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.AuthController = AuthController;
