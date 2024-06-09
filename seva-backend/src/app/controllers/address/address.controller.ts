import { providerDetail } from '../../models/provider/provider-detail.model';
import { NextFunction, Request, Response, Router } from 'express';

import Joi from 'joi';

import { validateRequest } from '../../middleware/validate-request.middleware';

import { ResponseService } from '../../services/response.service';

import { AddressService } from '../../services/address.service';

const respond = new ResponseService();
const addressService = new AddressService();

export class AddressController {

  router = Router();

  constructor(
  ) {
    this.router.get('/', this.getAccountAddresses);
  }

  async getAccountAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const addresses = await addressService.getAccountAddresses(
        req.headers.accountId as string
      );
      respond.success(res, 'Addresses Fetched', addresses);
    } catch (e) {
      if((e as any).message==='Addresses not found') respond.unauthorized(res);
      else next(e);
    }
  }

}
