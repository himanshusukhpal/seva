"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexModels = void 0;
const account_model_1 = require("./account/account.model");
const provider_detail_model_1 = require("./provider/provider-detail.model");
function indexModels(db) {
    const sequelize = db.sequelize;
    const Account = (0, account_model_1.initAccount)(sequelize);
    const ProviderDetail = (0, provider_detail_model_1.initProviderDetail)(sequelize);
    Account.hasMany(ProviderDetail, { foreignKey: 'accountId' });
    ProviderDetail.belongsTo(Account, { foreignKey: 'accountId' });
    db.accounts = Account;
    db.providerDetails = ProviderDetail;
    return db;
}
exports.indexModels = indexModels;
