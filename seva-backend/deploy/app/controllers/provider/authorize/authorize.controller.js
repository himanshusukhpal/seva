"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderAuthController = void 0;
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_config_1 = require("../../../config/db.config");
const response_service_1 = require("../../../services/response.service");
const validate_request_middleware_1 = require("../../../middleware/validate-request.middleware");
const token_service_1 = require("../../../services/token.service");
const tokens = new token_service_1.TokenService();
const respond = new response_service_1.ResponseService();
class ProviderAuthController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.post('/sign/in', this.signInSchema, this.signIn);
        this.router.get('/master/setup', this.setMaster);
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
            let account = await db_config_1.db.providers.findOne({ where: { phone: req.body.phone } });
            if (account) {
                // const passwordIsValid = bcrypt.compareSync(
                //   req.body.password,
                //   account.passwordHash
                // );
                // if (passwordIsValid) {
                //   } else respond.failed(res, 401, 'Email or Password incorrect');
            }
            else {
                const newAccount = {
                    name: '',
                    phone: req.body.phone,
                    status: true,
                    createdBy: 0,
                    updatedBy: 0
                };
                account = await (new db_config_1.db.providers(newAccount)).save();
            }
            const accessToken = tokens.generateToken({ accountId: account.id });
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
    // function signUpSchema (req, res, next) {
    //   const schema = Joi.object({
    //     firstName: Joi.string().required(),
    //     lastName: Joi.string().required(),
    //     email: Joi.string().email().required(),
    //     password: Joi.string().min(6).required(),
    //     confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    //   });
    //   validateRequest(req, res, next, schema);
    // }
    async setMaster(_req, res, next) {
        try {
            if (await db_config_1.db.consumers.findOne({
                where: { phone: '9899803166' }
            }))
                throw Error('Account already exists');
            const masterAccount = {
                name: 'Himanshu Sukhpal',
                phone: '9899803166',
                passwordHash: await bcryptjs_1.default.hash('P@SS123', 10),
                status: true,
                createdBy: 0,
                updatedBy: 0
            };
            await (new db_config_1.db.consumers(masterAccount)).save();
            respond.success(res, 'Master Setup Complete');
        }
        catch (e) {
            next(e);
        }
    }
}
exports.ProviderAuthController = ProviderAuthController;
