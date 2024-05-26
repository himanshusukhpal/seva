import { db } from '../config/db.config';

export class ConsumerService {

  async getConsumerById (id: string) {
    const consumer = await db.consumers.findByPk(id);
    if(consumer) return consumer;
    else throw Error('Consumer Not Found');
  }
  
}
