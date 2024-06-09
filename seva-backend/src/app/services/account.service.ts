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
    return sequelizeConn.transaction(async (t: any) => {
      const newAccount = Object.assign(
        requestBody, 
        {
          status: true,
          createdBy: 0,
          updatedBy: 0
        }
      );
      const savedAccount = await (new db.accounts(newAccount)).save({ transaction: t });
      return savedAccount;
    });
  }

  async updateAccount(accountId: string, accountUpdatePayload: Record<string, any>) {
    return sequelizeConn.transaction(async (t: any) => {
      const account = await this.getAccountById(accountId);
      await account.update(accountUpdatePayload);
      const updatedAccount = await account.save({ transaction: t });
      return updatedAccount;
    });
  }
  
}
