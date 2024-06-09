import { providerDetail } from './../../models/provider/provider-detail.model';
import { NextFunction, Request, Response, Router } from 'express';

import Joi from 'joi';

import { validateRequest } from '../../middleware/validate-request.middleware';

import { ResponseService } from '../../services/response.service';

import { AccountService } from '../../services/account.service';
import { ProviderService } from '../../services/provider.service';

const respond = new ResponseService();
const accountService = new AccountService();
const providerService = new ProviderService();

export class AccountController {

  router = Router();

  constructor(
  ) {
    this.router.get('/', this.getAccount);
    this.router.post('/', this.updateAccountSchema, this.updateAccount);
  }

  async getAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const account = await accountService.getAccountByIdWithProviderDetail(
        req.headers.accountId as string
      );
      respond.success(res, 'Account Fetched', account);
    } catch (e) {
      if((e as any).message==='Account Not Found') respond.unauthorized(res);
      else next(e);
    }
  }

  updateAccountSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      name: Joi.string().required(),
      dob: Joi.date().allow(null),
      email: Joi.string().allow(null, ''),
      isProvider: Joi.boolean().allow(null),
      providerDetail: Joi.object({
        aadhar: Joi.string().allow(null),
        pan: Joi.string().allow(null),
        emergencyContactName: Joi.string().allow(null),
        emergencyContactPhone: Joi.string().allow(null)
      }).allow(null)
    });
    validateRequest(req, res, next, schema);
  }
  async updateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const providerDetailsToUpdate = JSON.parse(JSON.stringify(req.body.providerDetail || null));
      delete req.body.providerDetail;
      const updatedAccount = (await accountService.updateAccount(
        req.headers.accountId as string,
        req.body
      )).toJSON();
      if(req.body.isProvider) {
        if(providerDetailsToUpdate) {
          const providerDetail = await providerService.getAccountProviderDetail(
            req.headers.accountId as string
          );
          const providerDetailId = providerDetail?.getDataValue('id');
          let updatedProviderDetail;
          if(providerDetailId) {
            updatedProviderDetail = await providerService.updateProviderDetailById(
              providerDetailId,
              providerDetailsToUpdate
            );
          } else {
            updatedProviderDetail = await providerService.createProviderDetail(
              req.headers.accountId as string,
              providerDetailsToUpdate
            )
          }
          updatedAccount['providerDetail'] = updatedProviderDetail;
        }
        else throw Error('Provider details are required for registration')
      }
      respond.success(res, 'Account Updated', updatedAccount);
    } catch (e) {
      if((e as any).message==='Account Not Found') respond.unauthorized(res);
      else next(e);
    }
  }

}
