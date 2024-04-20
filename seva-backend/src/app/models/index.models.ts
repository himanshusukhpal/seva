import { initProvider } from './provider/provider.model';

export function indexModels (db: Record<string, any>) {
  
  const sequelize = db.sequelize;

  const Provider = initProvider(sequelize);

  db.providers = Provider;

  return db;
}
