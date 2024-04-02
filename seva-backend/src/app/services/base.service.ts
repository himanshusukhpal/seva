import { db } from '../config/db.config';

export class BaseService {

  async getAccountById (id: string) {
    const account = await db.accounts.findByPk(id);
    if(account) return account;
    else throw Error('Account Not Found');
  }
  
}
