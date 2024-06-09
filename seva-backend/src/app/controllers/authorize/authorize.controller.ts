import { NextFunction, Request, Response, Router } from 'express';

import Joi from 'joi';
// import bcrypt from 'bcryptjs';

import { ResponseService } from '../../services/response.service';
import { validateRequest } from '../../middleware/validate-request.middleware';
import { AccountService } from '../../services/account.service';

import { TokenService } from '../../services/token.service';

const tokenService = new TokenService();
const respond = new ResponseService();
const accountService = new AccountService();

export class AuthController {
  
  router = Router();

  constructor() {
    this.router.post('/sign', this.signSchema, this.sign);
    // this.router.post('/sign/up', signUpSchema, signUp);
  }

  signSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      phone: Joi.string().length(10).required()
    });
    validateRequest(req, res, next, schema);
  }
  async sign(req: Request, res: Response, next: NextFunction) {
    try {
      let account = await accountService.getAccountByPhone(req.body.phone);
      if(!account) account = await accountService.signUpAccount(req.body);
      const accountId = account.get('id');
      const accessToken = tokenService.generateToken({ accountId });
      const date = new Date();
      date.setDate(date.getDate() + 1);
      respond.success(res, `Sign In success`, {
        accessToken
      });
    } catch (e) {
      next(e);
    }
  }

}
