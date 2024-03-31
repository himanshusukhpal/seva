import dotenv from 'dotenv';

import { Sequelize } from 'sequelize';
// import { DynamoDB } from "@aws-sdk/client-dynamodb";

import { indexModels } from '../models/index.models';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

let db: Record<string, any> = {};

// connect to db
const sequelize = new Sequelize(
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

// const ddb = new DynamoDB({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID : '',
//     secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET ? process.env.AWS_ACCESS_KEY_SECRET : ''
//   }
// });

// Compiling exported object db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize ModelsS
db = indexModels(db);

db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err: any) => {
    console.log('Failed to sync db: ' + err.message);
  });

// export { db, ddb };
export { db };
