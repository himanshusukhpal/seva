"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerAuthController = void 0;
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
// import bcrypt from 'bcryptjs';
const db_config_1 = require("../../../config/db.config");
const response_service_1 = require("../../../services/response.service");
const validate_request_middleware_1 = require("../../../middleware/validate-request.middleware");
const token_service_1 = require("../../../services/token.service");
const token = new token_service_1.TokenService();
const respond = new response_service_1.ResponseService();
class ConsumerAuthController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.post('/sign/in', this.signInSchema, this.signIn);
        // this.router.post('/sign/up', signUpSchema, signUp);
    }
    signInSchema(req, res, next) {
        const schema = joi_1.default.object({
            phone: joi_1.default.string().length(10).required()
        });
        (0, validate_request_middleware_1.validateRequest)(req, res, next, schema);
    }
    async signIn(req, res, next) {
        try {
            let consumer = await db_config_1.db.consumers.findOne({ where: { phone: req.body.phone } });
            if (!consumer) {
                const newConsumer = {
                    name: '',
                    phone: req.body.phone,
                    status: true,
                    createdBy: 0,
                    updatedBy: 0
                };
                consumer = await (new db_config_1.db.consumers(newConsumer)).save();
            }
            const accessToken = token.generateToken({ accountId: consumer.id });
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
exports.ConsumerAuthController = ConsumerAuthController;
