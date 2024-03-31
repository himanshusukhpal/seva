import { initAccount } from './account/account.model';

export function indexModels (db: Record<string, any>) {
  
  const sequelize = db.sequelize;

  const Account = initAccount(sequelize);

  db.accounts = Account;

  return db;
}
