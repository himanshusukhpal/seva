import { initAccount } from "./account/account.model";
import { initProviderDetail } from "./provider/provider-detail.model";

export function indexModels (db: Record<string, any>) {
  
  const sequelize = db.sequelize;

  const Account = initAccount(sequelize);
  const ProviderDetail = initProviderDetail(sequelize);

  Account.hasMany(ProviderDetail, { foreignKey: 'accountId' });
  ProviderDetail.belongsTo(Account, { foreignKey: 'accountId' });

  db.accounts = Account;
  db.providerDetails = ProviderDetail;

  return db;
}
