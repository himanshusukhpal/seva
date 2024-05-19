"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
class ResponseService {
    constructor() {
        this.success = (res, message, data) => res.status(200).json({
            code: 200,
            message,
            status: 'success',
            data
        });
        this.created = (res, message, data) => res.status(201).json({
            code: 201,
            message,
            status: 'success',
            data
        });
        this.notFound = (res, message) => res.status(404).json({
            code: 404,
            status: 'not found',
            message
        });
        this.failed = (res, code = 500, message) => res.status(code).json({
            code,
            status: 'failed',
            message
        });
        this.unauthorized = (res, message = 'Access unauthorized!') => res.status(401).json({
            code: 401,
            status: 'unauthorized',
            message
        });
        this.forbidden = (res, message = 'Access denied!') => res.status(403).json({
            code: 403,
            status: 'forbidden',
            message
        });
    }
}
exports.ResponseService = ResponseService;
