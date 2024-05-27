import { db } from '../config/db.config';

export class ProviderService {

  async getAccountProviderDetail(accountId: string, active?: boolean) {
    return await (
      active ?
      db.providerDetails.scope('active') :
      db.providerDetails
    ).findAll({ 
      where: {
        accountId
      }
    });
  }

  async getProviderDetailById (id: string) {
    const providerDetail = await db.providers.findByPk(id);
    if(providerDetail) return providerDetail;
    else throw Error('Provider Detail Not Found');
  }
  
}
