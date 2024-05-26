import { NextFunction, Request, Response, Router } from 'express';

import Joi from 'joi';
// import bcrypt from 'bcryptjs';

import { db } from '../../../config/db.config';

import { ResponseService } from '../../../services/response.service';
import { validateRequest } from '../../../middleware/validate-request.middleware';

import { TokenService } from '../../../services/token.service';

const token = new TokenService();
const respond = new ResponseService();

export class ConsumerAuthController {
  
  router = Router();

  constructor() {
    this.router.post('/sign/in', this.signInSchema, this.signIn);
    // this.router.post('/sign/up', signUpSchema, signUp);
  }

  signInSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      phone: Joi.string().length(10).required()
    });
    validateRequest(req, res, next, schema);
  }
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      let consumer = await db.consumers.findOne({ where: { phone: req.body.phone } });
      if(!consumer) {
        const newConsumer = {
          name: '',
          phone: req.body.phone,
          status: true,
          createdBy: 0,
          updatedBy: 0
        };
        consumer = await (new db.consumers(newConsumer)).save();
      }
      const accessToken = token.generateToken({ accountId: consumer.id });
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
