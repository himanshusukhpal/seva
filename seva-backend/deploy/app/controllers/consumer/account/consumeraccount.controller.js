"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerAccountController = void 0;
const express_1 = require("express");
const response_service_1 = require("../../../services/response.service");
const consumer_service_1 = require("../../../services/consumer.service");
const respond = new response_service_1.ResponseService();
const consumerService = new consumer_service_1.ConsumerService();
class ConsumerAccountController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get('/', this.getConsumer);
    }
    async getConsumer(req, res, next) {
        try {
            const consumer = await consumerService.getConsumerById(req.headers.accountId);
            respond.success(res, 'Consumer Fetched', consumer);
        }
        catch (e) {
            if (e.message === 'Consumer Not Found')
                respond.unauthorized(res);
            else
                next(e);
        }
    }
}
exports.ConsumerAccountController = ConsumerAccountController;
