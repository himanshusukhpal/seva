"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../config/auth.config");
const response_service_1 = require("../services/response.service");
const authConfig = new auth_config_1.AuthConfig();
const respond = new response_service_1.ResponseService();
class AuthMiddleware {
    constructor() { }
    async verifyAccountAccess(req, res, next) {
        try {
            const token = req.headers['x-access-token'];
            if (token && typeof token === 'string') {
                jsonwebtoken_1.default.verify(token, authConfig.secret, async (err, decoded) => {
                    if (err)
                        respond.unauthorized(res, (err.message === 'jwt expired' ? 'Session expired' : err.message));
                    else if (decoded &&
                        typeof decoded === 'object' &&
                        decoded.accountId) {
                        req.headers.accountId = decoded.accountId;
                        next();
                    }
                    else
                        respond.forbidden(res);
                });
            }
            else
                respond.forbidden(res);
        }
        catch (e) {
            respond.forbidden(res, e.message);
        }
    }
    async verifySuperAdminAccountAccess(req, res, next) {
        try {
            if (req.headers.accountId?.toString() !== (1).toString())
                respond.forbidden(res);
            next();
        }
        catch (e) {
            respond.forbidden(res, e.message);
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
