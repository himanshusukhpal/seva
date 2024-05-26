import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandler } from './app/middleware/error-handler.middleware';

import { AuthMiddleware } from './app/middleware/auth.middleware';

import { ProviderAuthController } from './app/controllers/provider/authorize/provider-authorize.controller';
import { ProviderAccountController } from './app/controllers/provider/account/provider-account.controller';

import { ConsumerAuthController } from './app/controllers/consumer/authorize/consumer-authorize.controller';
import { ConsumerAccountController } from './app/controllers/consumer/account/consumer-account.controller';

const app = express();

const PORT = process.env.PORT || 8090;

const corsOption = {
  origin: [
    'http://localhost:8100',
    'http://localhost:8101'
  ]
};

const apiRouter = express.Router();

app.use(cors(corsOption));

app.use(cookieParser());

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// simple route
app.get('/', (_req, res) => {
  res.send('Welcome to Seva api.');
});

app.use('/api/auth', (new ConsumerAuthController()).router);

app.use('/api/provider/auth', (new ProviderAuthController()).router);

apiRouter.use((req, res, next) => {
  (new AuthMiddleware()).verifyAccountAccess(req, res, next);
});
apiRouter.use('/account', (new ConsumerAccountController()).router);
apiRouter.use('/provider/account', (new ProviderAccountController()).router);

app.use('/api', apiRouter);

app.use(errorHandler);

export { app, PORT };
