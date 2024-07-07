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

  async createAddress(accountId: string, payload: Record<string, any>) {
    return sequelizeConn.transaction(async (t: any) =>
      await (new db.addresses({
        accountId,
        line1: payload.line1,
        line2: payload.line2,
        locality: payload.locality,
        pincode: payload.pincode,
        city: payload.city,
        state: payload.state,
        status: true,
        createdBy: accountId,
        updatedBy: accountId
      })).save({ transaction: t })
    );
  }

  async updateAddress(
    accountId: string,
    addressId: string,
    addressUpdatePayload: Record<string, any>
  ) {
    const address = await this.getAddressById(addressId);
    const addressAccountId = address.getDataValue('accountId');
    if(
      !addressAccountId ||
      addressAccountId!==accountId
    ) throw Error('Address not found');
    await address.update(addressUpdatePayload);
    return sequelizeConn.transaction(async (t: any) =>
      await address.save({ transaction: t })
    );
  }
  
}
