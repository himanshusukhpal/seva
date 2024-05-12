"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../config/auth.config");
const authConfig = new auth_config_1.AuthConfig();
class TokenService {
    generateToken(sub) {
        return jsonwebtoken_1.default.sign({ ...sub }, authConfig.secret, {
            expiresIn: 86400 // 24 hours
        });
    }
}
exports.TokenService = TokenService;
