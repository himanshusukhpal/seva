import { NextFunction, Request, Response, Router } from 'express';

import { ResponseService } from '../../services/response.service';
import { AccountService } from '../../services/account.service';

const respond = new ResponseService();
const accountService = new AccountService();

export class AccountController {

  router = Router();

  constructor(
  ) {
    this.router.get('/', this.getAccount);
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

}
