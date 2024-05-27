"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
// import bcrypt from 'bcryptjs';
const db_config_1 = require("../../config/db.config");
const response_service_1 = require("../../services/response.service");
const validate_request_middleware_1 = require("../../middleware/validate-request.middleware");
const token_service_1 = require("../../services/token.service");
const tokenService = new token_service_1.TokenService();
const respond = new response_service_1.ResponseService();
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
            let account = await db_config_1.db.accounts.findOne({ where: { phone: req.body.phone } });
            if (!account) {
                const newAccount = {
                    name: '',
                    phone: req.body.phone,
                    status: true,
                    createdBy: 0,
                    updatedBy: 0
                };
                account = await (new db_config_1.db.accounts(newAccount)).save();
            }
            const accessToken = tokenService.generateToken({ accountId: account.id });
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
