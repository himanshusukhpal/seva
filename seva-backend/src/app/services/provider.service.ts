import { db } from '../config/db.config';

export class ProviderService {

  async getProviderById (id: string) {
    const provider = await db.providers.findByPk(id);
    if(provider) return provider;
    else throw Error('Provider Not Found');
  }
  
}
