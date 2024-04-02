import { NextFunction, Request, Response, Router } from 'express';

import Joi from 'joi';
import bcrypt from 'bcryptjs';

import { db } from '../../config/db.config';

import { ResponseService } from '../../services/response.service';
import { validateRequest } from '../../middleware/validate-request.middleware';

import { TokenService } from '../../services/token.service';

import { Op } from 'sequelize';

const tokens = new TokenService();
const respond = new ResponseService();

export class AuthController {
  
  router = Router();

  constructor() {
    this.router.post('/sign/in', this.signInSchema, this.signIn);
    this.router.get('/master/setup', this.setMaster);
    // this.router.post('/sign/up', signUpSchema, signUp);
  }

  signInSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
    validateRequest(req, res, next, schema);
  }
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const account = await db.accounts.scope('withHash').findOne({ where: { email: req.body.email } });
      if (account) {
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          account.passwordHash
        );
        if (passwordIsValid) {
          const accessToken = tokens.generateToken({ accountId: account.id });
          const date = new Date();
          date.setDate(date.getDate() + 1);
          respond.success(res, 'Login success', {
            accessToken
          });
        } else respond.failed(res, 401, 'Email or Password incorrect');
      } else respond.notFound(res, 'Email not registered');
    } catch (e) {
      next(e);
    }
  }

  // function signUpSchema (req, res, next) {
  //   const schema = Joi.object({
  //     firstName: Joi.string().required(),
  //     lastName: Joi.string().required(),
  //     email: Joi.string().email().required(),
  //     password: Joi.string().min(6).required(),
  //     confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  //   });
  //   validateRequest(req, res, next, schema);
  // }
  async setMaster(_req: Request, res: Response, next: NextFunction) {
    try {
      if (
        await db.accounts.findOne({
          where: {
            [Op.or]: [
              { email: 'himanshu.sukhpal@yahoo.com' },
              { phone: '9899803166' }
            ]
          }
        })
      ) throw Error('Account already exists');
      const masterAccount = {
        name: 'Himanshu Sukhpal',
        email: 'himanshu.sukhpal@yahoo.com',
        phone: '9899803166',
        passwordHash: await bcrypt.hash('P@SS123', 10),
        status: true,
        createdBy: 0,
        updatedBy: 0
      };
      await (new db.accounts(masterAccount)).save();
      respond.success(res, 'Master Setup Complete')
    } catch (e) {
      next(e);
    }
  }

}
