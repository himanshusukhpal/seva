import { NextFunction, Request, Response, Router } from 'express';

import Joi from 'joi';
// import bcrypt from 'bcryptjs';

import { db } from '../../config/db.config';

import { ResponseService } from '../../services/response.service';
import { validateRequest } from '../../middleware/validate-request.middleware';

import { TokenService } from '../../services/token.service';

const tokenService = new TokenService();
const respond = new ResponseService();

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
      let account = await db.accounts.findOne({ where: { phone: req.body.phone } });
      if(!account) {
        const newAccount = {
          name: '',
          phone: req.body.phone,
          status: true,
          createdBy: 0,
          updatedBy: 0
        };
        account = await (new db.accounts(newAccount)).save();
      }
      const accessToken = tokenService.generateToken({ accountId: account.id });
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
