"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const db_config_1 = require("../config/db.config");
class AddressService {
    async getAddressById(addressId) {
        const address = await db_config_1.db.addresses.findByPk(addressId);
        if (address)
            return address;
        else
            throw Error('Address Not Found');
    }
    async getAccountAddresses(accountId, active) {
        return await (active ?
            db_config_1.db.addresses.scope('active') :
            db_config_1.db.addresses).findAll({
            where: {
                accountId
            }
        });
    }
}
exports.AddressService = AddressService;
