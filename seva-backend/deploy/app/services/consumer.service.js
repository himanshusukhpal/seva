"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerService = void 0;
const db_config_1 = require("../config/db.config");
class ConsumerService {
    async getConsumerById(id) {
        const consumer = await db_config_1.db.consumers.findByPk(id);
        if (consumer)
            return consumer;
        else
            throw Error('Consumer Not Found');
    }
}
exports.ConsumerService = ConsumerService;
