import { NextFunction, Request, Response, Router } from 'express';

import { ResponseService } from '../../../services/response.service';
import { ConsumerService } from '../../../services/consumer.service';

const respond = new ResponseService();
const consumerService = new ConsumerService();

export class ConsumerAccountController {

  router = Router();

  constructor(
  ) {
    this.router.get('/', this.getConsumer);
  }

  async getConsumer(req: Request, res: Response, next: NextFunction) {
    try {
      const consumer = await consumerService.getConsumerById(req.headers.accountId as string);
      respond.success(res, 'Consumer Fetched', consumer);
    } catch (e) {
      if((e as any).message==='Consumer Not Found') respond.unauthorized(res);
      else next(e);
    }
  }

}
