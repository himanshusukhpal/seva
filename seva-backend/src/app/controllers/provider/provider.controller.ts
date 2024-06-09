import { NextFunction, Request, Response, Router } from 'express';

import { ResponseService } from '../../services/response.service';
import { ProviderService } from '../../services/provider.service';

const respond = new ResponseService();
const providerService = new ProviderService();

export class ProviderDetailController {

  router = Router();

  constructor(
  ) {
    this.router.get('/', this.getProviderDetail);
    // this.router.post('/', this.updateMyProviderAccount);
  }

  async getProviderDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const providerDetail = await providerService.getAccountProviderDetail(
        req.headers.accountId as string, true
      );
      respond.success(res, 'Provider Detail Fetched', providerDetail || {});
    } catch (e) {
      if((e as any).message==='Provider Detail Not Found') respond.unauthorized(res);
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
