import { initConsumer } from './consumer/consumer.model';
import { initProvider } from './provider/provider.model';

export function indexModels (db: Record<string, any>) {
  
  const sequelize = db.sequelize;

  const Provider = initProvider(sequelize);
  const Consumer = initConsumer(sequelize);

  db.providers = Provider;
  db.consumers = Consumer;

  return db;
}
