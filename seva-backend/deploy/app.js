"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.app = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_handler_middleware_1 = require("./app/middleware/error-handler.middleware");
const auth_middleware_1 = require("./app/middleware/auth.middleware");
const authorize_controller_1 = require("./app/controllers/authorize/authorize.controller");
const account_controller_1 = require("./app/controllers/account/account.controller");
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 8090;
exports.PORT = PORT;
const corsOption = {
    origin: [
        'http://localhost:8100',
        'http://localhost:8101'
    ]
};
const apiRouter = express_1.default.Router();
app.use((0, cors_1.default)(corsOption));
app.use((0, cookie_parser_1.default)());
// parse requests of content-type - application/json
app.use((0, express_1.json)());
// parse requests of content-type - application/x-www-form-urlencoded
app.use((0, express_1.urlencoded)({ extended: true }));
// simple route
app.get('/', (_req, res) => {
    res.send('Welcome to Seva api.');
});
app.use('/api/auth', (new authorize_controller_1.AuthController()).router);
apiRouter.use((req, res, next) => {
    (new auth_middleware_1.AuthMiddleware()).verifyAccountAccess(req, res, next);
});
apiRouter.use('/account', (new account_controller_1.AccountController()).router);
apiRouter.use('/address', (new account_controller_1.AccountController()).router);
app.use('/api', apiRouter);
app.use(error_handler_middleware_1.errorHandler);
