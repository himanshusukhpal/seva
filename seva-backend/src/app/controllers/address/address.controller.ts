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
    this.router.post('/', this.createSchema, this.createAddress);
    this.router.put('/:addressId/', this.updateSchema, this.updateAddress);
  }

  async getAccountAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const addresses = await addressService.getAccountAddresses(
        req.headers.accountId as string
      );
      respond.success(res, 'Addresses Fetched', addresses);
    } catch (e) {
      if((e as any).message==='Addresses not found') respond.notFound(res);
      else next(e);
    }
  }

  createSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      line1: Joi.string().required(),
      line2: Joi.string(),
      locality: Joi.string(),
      pincode: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required()
    })
    validateRequest(req, res, next, schema);
  }
  async createAddress(req: Request, res: Response, next: NextFunction) {
    try {
      respond.success(res, 'Address Created', await addressService.createAddress(
        req.headers.accountId as string,
        req.body
      ));
    } catch (e) {
      if((e as any).message==='Address Not Found') respond.notFound(res);
      else next(e);
    }
  }

  updateSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      line1: Joi.string().required(),
      line2: Joi.string(),
      locality: Joi.string(),
      pincode: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required()
    })
    validateRequest(req, res, next, schema);
  }
  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      respond.success(res, 'Address Updated', await addressService.updateAddress(
        req.headers.accountId as string,
        req.params.addressId,
        req.body
      ));
    } catch (e) {
      if((e as any).message==='Address Not Found') respond.notFound(res);
      else next(e);
    }
  }

}
