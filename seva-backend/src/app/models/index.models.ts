import { Sequelize } from "sequelize";

import { account, initAccount } from "./account/account.model";
import { address, initAddress } from './address/address.model';
import { providerDetail, initProviderDetail  } from "./provider/provider-detail.model";

export interface DbModelsInterface {
  accounts: typeof account,
  addresses: typeof address,
  providerDetails: typeof providerDetail
}

export function indexModels ( sequelizeConn: Sequelize) {

  const Account = initAccount(sequelizeConn);
  const Address = initAddress(sequelizeConn);
  const ProviderDetail = initProviderDetail(sequelizeConn);

  ProviderDetail.belongsTo(Account, { foreignKey: 'accountId' });
  Account.hasOne(ProviderDetail, { foreignKey: 'accountId' });

  Address.belongsTo(Address, { foreignKey: 'accountId' });
  Account.hasMany(Account, { foreignKey: 'accountId' });

  const db: DbModelsInterface = {
    accounts: Account,
    addresses: Address,
    providerDetails: ProviderDetail
  };

  return db;
  
}
