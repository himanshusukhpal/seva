import { db } from '../config/db.config';

export class BaseService {

  async getProviderById (id: string) {
    const account = await db.providers.findByPk(id);
    if(account) return account;
    else throw Error('Account Not Found');
  }
  
}
