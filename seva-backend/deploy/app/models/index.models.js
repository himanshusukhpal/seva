"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexModels = void 0;
const provider_model_1 = require("./provider/provider.model");
function indexModels(db) {
    const sequelize = db.sequelize;
    const Provider = (0, provider_model_1.initProvider)(sequelize);
    db.providers = Provider;
    return db;
}
exports.indexModels = indexModels;
