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
    this.router.post('/provider/sign/in', this.signInSchema, this.signIn);
    this.router.get('/master/setup', this.setMaster);
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
      let account = await db.providers.findOne({ where: { phone: req.body.phone } });
      if(account) {
        // const passwordIsValid = bcrypt.compareSync(
        //   req.body.password,
        //   account.passwordHash
        // );
        // if (passwordIsValid) {
      //   } else respond.failed(res, 401, 'Email or Password incorrect');
      } else {
        const newAccount = {
          name: '',
          phone: req.body.phone,
          status: true,
          createdBy: 0,
          updatedBy: 0
        };
        account = await (new db.providers(newAccount)).save();
      }
      const accessToken = tokens.generateToken({ accountId: account.id });
      const date = new Date();
      date.setDate(date.getDate() + 1);
      respond.success(res, `Sign In success`, {
        accessToken
      });
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
        await db.consumers.findOne({
          where: { phone: '9899803166' }
        })
      ) throw Error('Account already exists');
      const masterAccount = {
        name: 'Himanshu Sukhpal',
        phone: '9899803166',
        passwordHash: await bcrypt.hash('P@SS123', 10),
        status: true,
        createdBy: 0,
        updatedBy: 0
      };
      await (new db.consumers(masterAccount)).save();
      respond.success(res, 'Master Setup Complete')
    } catch (e) {
      next(e);
    }
  }

}
