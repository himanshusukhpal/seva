import { NextFunction, Request, Response, Router } from 'express';

import { ResponseService } from '../../services/response.service';
import { BaseService } from '../../services/base.service';

const respond = new ResponseService();
const baseService = new BaseService();

export class AccountController {

  router = Router();

  constructor(
  ) {
    this.router.get('/:type', this.getAccount);
  }

  async getAccount(req: Request, res: Response, next: NextFunction) {
    try {
      let account;
      if(req.params.type==='provider') account = await baseService.getProviderById(req.headers.accountId as string);
      respond.success(res, 'Account Fetched', account);
    } catch (e) {
      if((e as any).message==='Account Not Found') respond.unauthorized(res);
      else next(e);
    }
  }

}
