"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
function validateRequest(req, res, next, schema, unknown = 'allowUnknown') {
    try {
        const options = {
            abortEarly: false, // include all errors
        };
        options[unknown] = true;
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return res.status(422).json({
                code: 422,
                message: (error.message),
                status: 'failed'
            });
        }
        req.body = value;
        next();
    }
    catch (e) {
        next(e);
    }
}
exports.validateRequest = validateRequest;
;
