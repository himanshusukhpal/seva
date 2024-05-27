import { db } from '../config/db.config';

export class AccountService {

  async getAccountById (id: string) {
    const account = await db.accounts.findByPk(id);
    if(account) return account;
    else throw Error('Account Not Found');
  }
  
}
