import { db, sequelizeConn } from '../config/db.config';

export class AddressService {

  async getAddressById (addressId: string) {
    const address = await db.addresses.findByPk(addressId);
    if(address) return address;
    else throw Error('Address Not Found');
  }
  
  async getAccountAddresses(accountId: string, active?: boolean) {
    return await (
      active ?
      db.addresses.scope('active') :
      db.addresses
    ).findAll({
      where: {
        accountId
      }
    });
  }
  
}
