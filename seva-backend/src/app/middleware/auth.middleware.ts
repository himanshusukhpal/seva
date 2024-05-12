import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { AuthConfig } from '../config/auth.config';

import { ResponseService } from '../services/response.service';

const authConfig = new AuthConfig();
const respond = new ResponseService();

export class AuthMiddleware {
  
  constructor() {}

  async verifyAccountAccess (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['x-access-token'];
      if (token && typeof token === 'string') {
        jwt.verify(token, authConfig.secret, async (err, decoded) => {
          if (err) respond.unauthorized(res, (err.message==='jwt expired'?'Session expired':err.message));
          else if (
            decoded &&
            typeof decoded === 'object' &&
            decoded.accountId
          ) {
            req.headers.accountId = decoded.accountId
            next();
          }
          else respond.forbidden(res, 'Access Denied!');
        });
      } else respond.forbidden(res, 'Access Denied!');
    } catch (e: any) {
      respond.forbidden(res, e.message);
    }
  }

  async verifySuperAdminAccountAccess (req: Request, res: Response, next: NextFunction) {
    try {
      if(req.headers.accountId?.toString()!==(1).toString()) respond.forbidden(res, 'Access Denied!');
      next();
    } catch (e: any) {
      respond.forbidden(res, e.message);
    }
  }

}
