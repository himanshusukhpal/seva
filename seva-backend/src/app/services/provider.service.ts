import { db, sequelizeConn } from '../config/db.config';

export class ProviderService {

  async getAccountProviderDetail(accountId: string, active?: boolean) {
    return await (
      active ?
      db.providerDetails.scope('active') :
      db.providerDetails
    ).findOne({
      where: {
        accountId
      }
    });
  }

  async getProviderDetailById (id: string) {
    const providerDetail = await db.providerDetails.findByPk(id);
    if(providerDetail) return providerDetail;
    else throw Error('Provider Detail Not Found');
  }

  async createProviderDetail(accountId: string, providerDetailPayload: Record<string, any>) {
    return sequelizeConn.transaction(async (t: any) => {
      const newproviderDetail = Object.assign(
        providerDetailPayload, 
        {
          accountId,
          status: true,
          createdBy: accountId,
          updatedBy: accountId
        }
      );
      const savedproviderDetail = await (
        new db.providerDetails(newproviderDetail)
      ).save({ transaction: t });
      return savedproviderDetail;
    });
  }

  async updateProviderDetailById(id: string, providerDetailUpdatePayload: Record<string, any>) {
    return sequelizeConn.transaction(async (t: any) => {
      const providerDetail = await this.getProviderDetailById(id);
      await providerDetail.update(providerDetailUpdatePayload);
      const updatedProviderDetail = await providerDetail.save({ transaction: t });
      return updatedProviderDetail;
    });
  }
  
}
