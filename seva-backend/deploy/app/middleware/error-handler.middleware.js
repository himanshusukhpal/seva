"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(e, _req, res, _next) {
    if (e?.message?.toLowerCase().includes('not found')) {
        return res.status(404).json({
            code: 404,
            message: e?.message,
            status: 'not found'
        });
    }
    return res.status(500).json({
        code: 500,
        message: e?.message,
        status: 'error'
    });
}
exports.errorHandler = errorHandler;
