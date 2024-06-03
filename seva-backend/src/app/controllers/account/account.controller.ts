import { NextFunction, Request, Response, Router } from 'express';

import Joi from 'joi';

import { ResponseService } from '../../services/response.service';
import { validateRequest } from '../../middleware/validate-request.middleware';
import { AccountService } from '../../services/account.service';

const respond = new ResponseService();
const accountService = new AccountService();

export class AccountController {

  router = Router();

  constructor(
  ) {
    this.router.get('/', this.getAccount);
    this.router.post('/', this.updateAccountSchema, this.updateAccount);
  }

  async getAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const account = await accountService.getAccountById(req.headers.accountId as string);
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
      email: Joi.string().email().allow(null, '')
    });
    validateRequest(req, res, next, schema);
  }
  async updateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedAccount = await accountService.updateAccount(
        req.headers.accountId as string,
        req.body
      );
      respond.success(res, 'Account Updated', updatedAccount);
    } catch (e) {
      if((e as any).message==='Account Not Found') respond.unauthorized(res);
      else next(e);
    }
  }

}
