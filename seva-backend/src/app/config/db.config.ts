import dotenv from 'dotenv';

import { Sequelize } from 'sequelize';

import { indexModels } from '../models/index.models';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// connect to db
export const sequelizeConn = new Sequelize(
  DB_NAME ? DB_NAME : '',
  DB_USER ? DB_USER : '',
  DB_PASSWORD ? DB_PASSWORD : '',
  {
    host: DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = indexModels(sequelizeConn);

sequelizeConn.sync({ alter: true })
.then(() => {
  console.log('Synced db.');
})
.catch((err: any) => {
  console.log('Failed to sync db: ' + err.message);
});

export { db };
