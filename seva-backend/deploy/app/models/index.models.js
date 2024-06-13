"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexModels = void 0;
const account_model_1 = require("./account/account.model");
const address_model_1 = require("./address/address.model");
const provider_detail_model_1 = require("./provider/provider-detail.model");
function indexModels(sequelizeConn) {
    const Account = (0, account_model_1.initAccount)(sequelizeConn);
    const Address = (0, address_model_1.initAddress)(sequelizeConn);
    const ProviderDetail = (0, provider_detail_model_1.initProviderDetail)(sequelizeConn);
    ProviderDetail.belongsTo(Account, { foreignKey: 'accountId' });
    Account.hasOne(ProviderDetail, { foreignKey: 'accountId' });
    Account.belongsToMany(Address, { through: 'account-address' });
    Address.belongsToMany(Account, { through: 'account-address' });
    const db = {
        accounts: Account,
        addresses: Address,
        providerDetails: ProviderDetail
    };
    return db;
}
exports.indexModels = indexModels;
