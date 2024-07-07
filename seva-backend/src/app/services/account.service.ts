import { db, sequelizeConn } from '../config/db.config';

export class AccountService {

  async getAccountById (id: string) {
    const account = await db.accounts.findByPk(id);
    if(account) return account;
    else throw Error('Account Not Found');
  }
  
  async getAccountByIdWithProviderDetail (id: string) {
    const account = await db.accounts.findByPk(id, {
      include: db.providerDetails
    });
    if(account) return account;
    else throw Error('Account Not Found');
  }

  async getAccountByPhone (phone: string) {
    return await db.accounts.findOne({
      where: {
        phone
      }
    });
  }
  
  async signUpAccount(requestBody: Record<string, any>) {
    const newAccount = Object.assign(
      requestBody, 
      {
        status: true,
        createdBy: 0,
        updatedBy: 0
      }
    );
    return sequelizeConn.transaction(async (t: any) => 
      await (new db.accounts(newAccount)).save({ transaction: t })
    );
  }

  async updateAccount(
    accountId: string,
    accountUpdatePayload: Record<string, any>
  ) {
    const account = await this.getAccountById(accountId);
    await account.update(accountUpdatePayload);
    return sequelizeConn.transaction(async (t: any) =>
      await account.save({ transaction: t })
    );
  }
  
}
