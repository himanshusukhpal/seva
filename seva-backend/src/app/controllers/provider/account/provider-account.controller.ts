import { NextFunction, Request, Response, Router } from 'express';

import { ResponseService } from '../../../services/response.service';
import { ProviderService } from '../../../services/provider.service';

const respond = new ResponseService();
const providerService = new ProviderService();

export class ProviderAccountController {

  router = Router();

  constructor(
  ) {
    this.router.get('/', this.getProvider);
    // this.router.post('/', this.updateMyProviderAccount);
  }

  async getProvider(req: Request, res: Response, next: NextFunction) {
    try {
      const provider = await providerService.getProviderById(req.headers.accountId as string);
      respond.success(res, 'Provider Fetched', provider);
    } catch (e) {
      if((e as any).message==='Provider Not Found') respond.unauthorized(res);
      else next(e);
    }
  }

  // async updateMyProviderAccount(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const provider = await providerService.getProviderById(req.headers.accountId as string);
  //     respond.success(res, 'Provider Fetched', provider);
  //   } catch (e) {
  //     if((e as any).message==='Provider Not Found') respond.unauthorized(res);
  //     else next(e);
  //   }
  // }

}
